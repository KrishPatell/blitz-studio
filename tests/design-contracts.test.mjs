import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {validateSchema,cssRules,checkContracts,renderBinding,tokenValue} from '../scripts/design-contracts.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const read=path=>readFile(resolve(root,path),'utf8');
const tokens=JSON.parse(await read('design/design-tokens.json'));
const schema=JSON.parse(await read('design/design-tokens.schema.json'));
const files=[...new Set([...tokens.baseline.cssOrder.map(file=>'dist/'+file),...tokens.contracts.javascript.map(contract=>contract.file)])];
const sources=Object.fromEntries(await Promise.all(files.map(async file=>[file,await read(file)])));
const rules=tokens.baseline.cssOrder.flatMap(file=>cssRules(sources['dist/'+file],'dist/'+file));
const clone=()=>structuredClone(tokens);
test('reviewed registry validates against schema and homepage contracts',()=>{
 validateSchema(tokens,schema);assert.equal(checkContracts(tokens,rules,sources),tokens.contracts.css.length+tokens.contracts.javascript.length);
});
test('rejects unknown fields and missing mandatory roles',()=>{
 const changed=clone();changed.motion.randomPulse=200;assert.throws(()=>validateSchema(changed,schema),/unknown property randomPulse/);
 delete changed.motion.randomPulse;delete changed.typography.display;assert.throws(()=>validateSchema(changed,schema),/missing display/);
});
test('rejects invalid thresholds, intervals and easing syntax',()=>{
 const changed=clone();changed.motion.revealThreshold=1.2;assert.throws(()=>validateSchema(changed,schema),/maximum/);
 changed.motion.revealThreshold=.08;changed.motion.intervalMs.process=0;assert.throws(()=>validateSchema(changed,schema),/minimum/);
 changed.motion.intervalMs.process=6000;changed.motion.easing.settle='bouncy';assert.throws(()=>validateSchema(changed,schema),/must match/);
});
test('motion metadata cannot drift while live source stays unchanged',()=>{
 const changed=clone();changed.motion.durationMs.cardHover=900;assert.throws(()=>checkContracts(changed,rules,sources),/card-hover/);
});
test('easing used inside composed source declarations is checked',()=>{
 const changed=clone();changed.motion.easing.settle='linear';assert.throws(()=>checkContracts(changed,rules,sources),/card-hover/);
});
test('font hierarchy and mobile geometry are bound to source',()=>{
 const changed=clone();changed.typography.stories.desktop='64px';assert.throws(()=>checkContracts(changed,rules,sources),/stories-heading/);
 changed.typography.stories.desktop='44px';changed.components.storiesCard.paddingMobile='12px';assert.throws(()=>checkContracts(changed,rules,sources),/geometry-storiesCard-mobile/);
});
test('JavaScript interval and source drift are caught',()=>{
 const changed=clone();changed.motion.intervalMs.process=8000;assert.throws(()=>checkContracts(changed,rules,sources),/process-cycle/);
 assert.throws(()=>checkContracts(tokens,rules,{...sources,'dist/app.js':sources['dist/app.js'].replace('processIndex+1)%4),6000','processIndex+1)%4),9000')}),/process-cycle/);
});
test('source declarations are checked independently of fingerprints',()=>{
 const altered=structuredClone(rules);altered.find(rule=>rule.selector==='.casestudy-card'&&rule.file==='dist/refinements.css').declarations.transition='none';
 assert.throws(()=>checkContracts(tokens,altered,sources),/card-hover/);
});
test('contract IDs and token references cannot be ambiguous or missing',()=>{
 const changed=clone();changed.contracts.css.push(changed.contracts.css[0]);assert.throws(()=>checkContracts(changed,rules,sources),/Duplicate contract/);
 assert.throws(()=>tokenValue(tokens,'motion.missing'),/Missing contract token/);
 assert.throws(()=>renderBinding({token:'motion.durationMs.cardHover',template:'{{motion.missing}}'},tokens),/Missing contract token/);
});
test('parser preserves media scope, declaration order and quoted punctuation',()=>{
 const parsed=cssRules('.a{font:400 12px/1 Arial;content:"a;b"} @media(max-width:743px){.a{padding:24px}} .a{font:500 12px/1 Arial}','example.css');
 assert.equal(parsed[0].declarations.content,'"a;b"');assert.deepEqual(parsed[1].conditions,['@media(max-width:743px)']);assert.equal(parsed[2].declarations.font,'500 12px/1 Arial');
});
test('unsupported schema vocabulary fails closed',()=>{
 assert.throws(()=>validateSchema({}, {type:'object',unknownKeyword:true}),/unsupported schema keyword/);
});
test('baseline refresh without a review record is rejected without changing the baseline',async()=>{
 const before=await read('design/homepage-baseline.json');
 const result=spawnSync(process.execPath,['scripts/design-tokens.mjs','--update-baseline'],{cwd:root,encoding:'utf8'});
 assert.notEqual(result.status,0);assert.match(result.stderr,/Baseline refresh needs --review-record/);
 assert.equal(await read('design/homepage-baseline.json'),before);
});
