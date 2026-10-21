import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolveSeoEnvironment} from '../scripts/seo-config.mjs';
const config=JSON.parse(readFileSync(new URL('../content/seo.json',import.meta.url)));
test('default builds always target indexable production',()=>{
  assert.deepEqual(resolveSeoEnvironment(config),{origin:'https://blitzstudio.xyz',indexing:true});
});
test('a persisted staging domain fails the production build',()=>{
  assert.throws(()=>resolveSeoEnvironment({...config,deploymentOrigin:config.previewOrigin}),/Never persist a staging/);
});
test('explicit previews are noindex and unknown origins fail',()=>{
  assert.deepEqual(resolveSeoEnvironment(config,config.previewOrigin),{origin:config.previewOrigin,indexing:false});
  assert.throws(()=>resolveSeoEnvironment(config,'https://unrelated.example'),/approved production/);
  assert.throws(()=>resolveSeoEnvironment({...config,indexPreview:true},config.previewOrigin),/Preview indexing is prohibited/);
});
