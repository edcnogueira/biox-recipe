// import { Injectable } from '@nestjs/common';
// import * as sqlite3 from 'sqlite3';
//
// @Injectable()
// export class DatabaseService {
//   private db: sqlite3.Database;
//
//   constructor() {
//     this.db = new sqlite3.Database(':memory:');
//   }
//
//   async onModuleInit() {
//     await this.createTable();
//   }
//
//   private createTable(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       this.db.run(
//         `CREATE TABLE IF NOT EXISTS recipes (
//           id TEXT PRIMARY KEY,
//           title TEXT NOT NULL,
//           description TEXT NOT NULL,
//           ingredients TEXT NOT NULL,
//           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//           updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//         )`,
//         (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve();
//           }
//         },
//       );
//     });
//   }
//
//   run(query: string, params: any[] = []): Promise<void> {
//     return new Promise((resolve, reject) => {
//       this.db.run(query, params, (err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve();
//         }
//       });
//     });
//   }
//
//   all(query: string, params: any[] = []): Promise<any[]> {
//     return new Promise((resolve, reject) => {
//       this.db.all(query, params, (err, rows) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(rows);
//         }
//       });
//     });
//   }
//
//   get(query: string, params: any[] = []): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.db.get(query, params, (err, row) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(row);
//         }
//       });
//     });
//   }
// }
