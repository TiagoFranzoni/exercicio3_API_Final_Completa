/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('usuario').del()
  await knex('usuario').insert([
    { id: 1, nome: 'Administrator', login: 'admin', email: 'admin@pucminas.com.br', senha: '$2a$08$tprzZIs1OTKVMaVzZWrKfe8rX3toatWD6lsvp4u9AR54mrbSSLX7e', roles: 'ADMIN;USER' },
    { id: 2, nome: 'Usuario', login: 'user', email: 'user@pucminas.com.br', senha: '$2a$08$tprzZIs1OTKVMaVzZWrKfe8rX3toatWD6lsvp4u9AR54mrbSSLX7e', roles: 'USER' }
  ]);
};
