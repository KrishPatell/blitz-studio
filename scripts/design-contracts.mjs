// Small dependency-free validator for the JSON Schema vocabulary used by this registry.
// Unknown schema keywords fail closed rather than silently weakening enforcement.
export function validateSchema(value, schema, root=schema, path='$') {
 const fail=message=>{throw Error(`${path}: ${message}`)};
 const supported=new Set(['$schema','$id','$defs','$ref','title','description','type','properties','required','additionalProperties','patternProperties','items','minItems','minimum','maximum','enum','const','pattern']);
 for(const key of Object.keys(schema))if(!supported.has(key))fail(`unsupported schema keyword ${key}`);
 if(schema.$ref){
  if(!schema.$ref.startsWith('#/'))fail('only local schema references are supported');
  const target=schema.$ref.slice(2).split('/').reduce((node,key)=>node?.[key.replace(/~1/g,'/').replace(/~0/g,'~')],root);
  if(!target)fail(`unresolved reference ${schema.$ref}`);
  validateSchema(value,target,root,path);
 }
 const type=Array.isArray(value)?'array':value===null?'null':typeof value;
 if(schema.type&&!(Array.isArray(schema.type)?schema.type:[schema.type]).some(t=>t===type||(t==='integer'&&Number.isInteger(value))))fail(`expected ${schema.type}, received ${type}`);
 if('const' in schema&&JSON.stringify(value)!==JSON.stringify(schema.const))fail(`must equal ${JSON.stringify(schema.const)}`);
 if(schema.enum&&!schema.enum.some(option=>JSON.stringify(option)===JSON.stringify(value)))fail('value is outside the allowed options');
 if(type==='number'){
  if(!Number.isFinite(value))fail('number must be finite');
  if(schema.minimum!==undefined&&value<schema.minimum)fail(`minimum is ${schema.minimum}`);
  if(schema.maximum!==undefined&&value>schema.maximum)fail(`maximum is ${schema.maximum}`);
 }
 if(type==='string'&&schema.pattern&&!new RegExp(schema.pattern).test(value))fail(`must match ${schema.pattern}`);
 if(type==='array'){
  if(schema.minItems!==undefined&&value.length<schema.minItems)fail(`needs at least ${schema.minItems} items`);
  if(schema.items)value.forEach((item,i)=>validateSchema(item,schema.items,root,`${path}[${i}]`));
 }
 if(type==='object'){
  for(const key of schema.required||[])if(!(key in value))fail(`missing ${key}`);
  for(const [key,item] of Object.entries(value)){
   const matches=Object.entries(schema.patternProperties||{}).filter(([pattern])=>new RegExp(pattern).test(key));
   if(schema.properties?.[key])validateSchema(item,schema.properties[key],root,`${path}.${key}`);
   for(const [,definition] of matches)validateSchema(item,definition,root,`${path}.${key}`);
   if(!schema.properties?.[key]&&!matches.length){
    if(schema.additionalProperties===false)fail(`unknown property ${key}`);
    if(schema.additionalProperties&&typeof schema.additionalProperties==='object')validateSchema(item,schema.additionalProperties,root,`${path}.${key}`);
   }
  }
 }
}

export function tokenValue(tokens,path){
 const value=path.split('.').reduce((node,key)=>node?.[key],tokens);
 if(value===undefined)throw Error(`Missing contract token ${path}`);
 return value;
}

export function renderBinding(binding,tokens){
 const value=tokenValue(tokens,binding.token);
 if(typeof value!=='string'&&typeof value!=='number')throw Error(`Contract ${binding.token} must reference a scalar`);
 const format=(value,kind)=>{
  if(!kind)return String(value);
  if(typeof value!=='number')throw Error(`Numeric format ${kind} requires a number`);
  if(kind==='seconds')return String(value/1000).replace(/^0\./,'.')+'s';
  if(kind==='decimal')return String(value).replace(/^0\./,'.');
  throw Error(`Unknown contract format ${kind}`);
 };
 const result=format(value,binding.format);
 return binding.template===undefined?result:binding.template.replaceAll('{value}',result).replace(/\{\{([\w.-]+)(?:\|([\w]+))?\}\}/g,(_,path,kind)=>format(tokenValue(tokens,path),kind));
}

// Preserve file, selector and media scope. This is a declaration contract parser,
// not a substitute for browser cascade/layout review.
export function cssRules(css,file){
 const rules=[];css=css.replace(/\/\*[\s\S]*?\*\//g,'');
 function visit(start,end,conditions=[]){
  let cursor=start;
  while(cursor<end){
   const open=css.indexOf('{',cursor);if(open<0||open>=end)break;
   const selector=css.slice(cursor,open).trim();let depth=1,quote='',escaped=false,close=open+1;
   for(;close<end&&depth;close++){
    const c=css[close];if(escaped){escaped=false;continue}if(c==='\\'){escaped=true;continue}
    if(quote){if(c===quote)quote='';continue}if(c==='"'||c==="'"){quote=c;continue}
    if(c==='{')depth++;if(c==='}')depth--;
   }
   if(depth)throw Error(`Unbalanced CSS in ${file}`);
   const body=css.slice(open+1,close-1);
   if(selector.startsWith('@')&&body.includes('{'))visit(open+1,close-1,[...conditions,selector]);
   else if(!selector.startsWith('@')){
    const declarations={};let part='',nested=0,string='',escape=false;
    const add=()=>{const colon=part.indexOf(':');if(colon>0)declarations[part.slice(0,colon).trim()]=part.slice(colon+1).trim();part=''};
    for(const c of body){
     if(escape){part+=c;escape=false;continue}if(c==='\\'){part+=c;escape=true;continue}
     if(string){part+=c;if(c===string)string='';continue}if(c==='"'||c==="'"){string=c;part+=c;continue}
     if(c==='('||c==='[')nested++;if(c===')'||c===']')nested--;
     if(c===';'&&!nested)add();else part+=c;
    }
    add();rules.push({file,selector,conditions,declarations});
   }
   cursor=close;
  }
 }
 visit(0,css.length);return rules;
}

const compact=value=>String(value).replace(/\s+/g,'');
export function checkContracts(tokens,rules,sources){
 const ids=new Set();
 for(const contract of tokens.contracts.css){
  if(ids.has(contract.id))throw Error(`Duplicate contract ${contract.id}`);ids.add(contract.id);
  const matches=rules.filter(rule=>rule.file===contract.file&&rule.selector.split(',').some(selector=>compact(selector)===compact(contract.selector))&&JSON.stringify(rule.conditions.map(compact))===JSON.stringify(contract.conditions.map(compact)));
  const effective=Object.assign({},...matches.map(rule=>rule.declarations));
  for(const [property,binding] of Object.entries(contract.properties)){
   const expected=renderBinding(binding,tokens);
   if(compact(effective[property]||'')!==compact(expected))throw Error(`${contract.id}: ${property} must match ${binding.token}; expected ${expected}, found ${effective[property]||'missing'}`);
  }
 }
 for(const contract of tokens.contracts.javascript){
  if(ids.has(contract.id))throw Error(`Duplicate contract ${contract.id}`);ids.add(contract.id);
  const snippet=renderBinding(contract,tokens);
  if(!sources[contract.file]?.includes(snippet))throw Error(`${contract.id}: ${contract.file} must contain the reviewed binding for ${contract.token}`);
 }
 return ids.size;
}
