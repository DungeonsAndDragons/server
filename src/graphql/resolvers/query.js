import { database } from '../../db'

export const Query = {
    spells: async (_, args, context) => {
        try {
          const db = await database;
          const spells = await db.all('SELECT * FROM Spells');
          return spells;
          // const [post, categories] = await Promise.all([
          //   db.get('SELECT * FROM Post WHERE id = ?', "someID"), // use args.id
          //   db.all('SELECT * FROM Category')
          // ]);
          // res.render('post', { post, categories });
        } catch (err) {
          return err; // new Error('Oh noes! Something went wrong ...');
        }
    }
};
