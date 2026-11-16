import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeOptions,choose} from '../src/picker.mjs';
test('空白與重複不增加抽中機率',()=>assert.deepEqual(normalizeOptions(' A \n\nB\nA\r\n C '),['A','B','C']));
test('選項不足或過多不能抽選',()=>{assert.throws(()=>choose(['A']));assert.throws(()=>choose(Array(1001).fill('A')));});
test('各索引可被選中',()=>{for(let i=0;i<3;i++)assert.equal(choose(['A','B','C'],()=>i),['A','B','C'][i]);});
test('拒絕超出等分範圍的隨機值',()=>{const values=[2**32-1,2];assert.equal(choose(['A','B','C'],()=>values.shift()),'C');});
