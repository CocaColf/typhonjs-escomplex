import { assert } from 'chai';

import escomplex from '../../../src';

import * as testconfig  from '../testconfig';

if (testconfig.modules['index'])
{
   suite('typhonjs-escomplex:', () =>
   {
      suite('escomplex:', () =>
      {
         test('analyze function is exported', () =>
         {
            assert.isFunction(escomplex.analyze);
         });

         test('analyzeAST function is exported', () =>
         {
            assert.isFunction(escomplex.analyzeAST);
         });

         test('analyzeProject function is exported', () =>
         {
            assert.isFunction(escomplex.analyzeProject);
         });

         test('analyzeProjectAST function is exported', () =>
         {
            assert.isFunction(escomplex.analyzeProjectAST);
         });

         test('parse function is exported', () =>
         {
            assert.isFunction(escomplex.parse);
         });

         test('processProjectResults function is exported', () =>
         {
            assert.isFunction(escomplex.processProjectResults);
         });

         test('sanity test - analyze', () =>
         {
            const result = escomplex.analyze('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            assert.isObject(result);
            assert.strictEqual(result.aggregate.sloc.logical, 3);
         });

         test('sanity test - analyzeAST', () =>
         {
            const ast = escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            assert.isObject(ast);
            assert.strictEqual(ast.type, 'File');
            assert.isObject(ast.program);

            const result = escomplex.analyzeAST(ast);

            assert.isObject(result);
            assert.strictEqual(result.aggregate.sloc.logical, 3);
         });

         test('sanity test - analyzeProject', () =>
         {
            const sources =
            [
               { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', srcPath: '/path/to/file/a' },
               { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', srcPath: '/path/to/file/b' }
            ];

            const results = escomplex.analyzeProject(sources);

            assert.isObject(results);
            assert.isArray(results.reports);
            assert.strictEqual(results.reports.length, 2);
            assert.isObject(results.reports[0]);
            assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
            assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
         });

         test('sanity test - analyzeProjectAST', () =>
         {
            const modules =
            [
               {
                  ast: escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }'),
                  srcPath: '/path/to/file/a'
               },
               {
                  ast: escomplex.parse('const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];'),
                  srcPath: '/path/to/file/b'
               }
            ];

            const results = escomplex.analyzeProjectAST(modules);

            assert.isObject(results);
            assert.isArray(results.reports);
            assert.strictEqual(results.reports.length, 2);
            assert.isObject(results.reports[0]);
            assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
            assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
         });

         test('sanity test - parse', () =>
         {
            const ast = escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            assert.isObject(ast);
            assert.strictEqual(ast.type, 'File');
            assert.isObject(ast.program);
         });

         test('sanity test - processProjectResults', () =>
         {
            const sources =
            [
               { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', srcPath: '/path/to/file/a' },
               { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', srcPath: '/path/to/file/b' }
            ];

            let results = escomplex.analyzeProject(sources, { skipCalculation: true });

            results = escomplex.processProjectResults(results);

            assert.isObject(results);
            assert.isArray(results.reports);
            assert.strictEqual(results.reports.length, 2);
            assert.isObject(results.reports[0]);
            assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
            assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
         });

         test('sanity test - analyzeAsync', () =>
         {
            const promise = escomplex.analyzeAsync('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            promise.then((result) =>
            {
               assert.isObject(result);
               assert.strictEqual(result.aggregate.sloc.logical, 3);
            });
         });

         test('sanity test - analyzeASTAsync', () =>
         {
            const ast = escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            assert.isObject(ast);
            assert.strictEqual(ast.type, 'File');
            assert.isObject(ast.program);

            const promise = escomplex.analyzeASTAsync(ast);

            promise.then((result) =>
            {
               assert.isObject(result);
               assert.strictEqual(result.aggregate.sloc.logical, 3);
            });
         });

         test('sanity test - analyzeProjectAsync', () =>
         {
            const sources =
            [
               { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', srcPath: '/path/to/file/a' },
               { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', srcPath: '/path/to/file/b' }
            ];

            const promise = escomplex.analyzeProjectAsync(sources);

            promise.then((results) =>
            {
               assert.isObject(results);
               assert.isArray(results.reports);
               assert.strictEqual(results.reports.length, 2);
               assert.isObject(results.reports[0]);
               assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
               assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
            });
         });

         test('sanity test - analyzeProjectASTAsync', () =>
         {
            const modules =
            [
               {
                  ast: escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }'),
                  srcPath: '/path/to/file/a'
               },
               {
                  ast: escomplex.parse('const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];'),
                  srcPath: '/path/to/file/b'
               }
            ];

            const promise = escomplex.analyzeProjectASTAsync(modules);

            promise.then((results) =>
            {
               assert.isObject(results);
               assert.isArray(results.reports);
               assert.strictEqual(results.reports.length, 2);
               assert.isObject(results.reports[0]);
               assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
               assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
            });
         });

         test('sanity test - parseAsync', () =>
         {
            const promise = escomplex.parseAsync('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            promise.then((ast) =>
            {
               assert.isObject(ast);
               assert.strictEqual(ast.type, 'File');
               assert.isObject(ast.program);
            });
         });

         test('sanity test - processProjectResultsAsync', () =>
         {
            const sources =
            [
               { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', srcPath: '/path/to/file/a' },
               { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', srcPath: '/path/to/file/b' }
            ];

            escomplex.analyzeProjectAsync(sources, { skipCalculation: true }).then((results) =>
            {
               return escomplex.processProjectResultsAsync(results);
            }).then((results) =>
            {
               assert.isObject(results);
               assert.isArray(results.reports);
               assert.strictEqual(results.reports.length, 2);
               assert.isObject(results.reports[0]);
               assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
               assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
            });
         });
      });
   });
}