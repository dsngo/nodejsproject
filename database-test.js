/* eslint no-console:0 */
const Blog = require('./models/Blog');
const Comment = require('./models/Comment');

const dbConfig = require('./controllers/databaseConfigs');

dbConfig();

const data = [
  {
    title: 'BLOG1',
    image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    author: 'Daniel',
  },
  {
    title: 'BLOG2',
    image: 'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    author: 'Daniel',
  },
  {
    title: 'BLOG3',
    image: 'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    author: 'Daniel',
  },
];

const addSeeds = () =>
  data.map(async seed => {
    const newBlog = await Blog.create(seed);
    console.log('create a blog!');
    newBlog.comments.push(
      await Comment.create({
        text: 'Something something good',
        author: 'Michelle',
      })
    );
    return newBlog.save();
  });

const seedDB = async () => {
  await Blog.remove();
  await Comment.remove();
  console.log('remove blogs and comments');
  return addSeeds();
};

seedDB().catch(console.log);
