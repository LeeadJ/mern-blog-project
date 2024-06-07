import './App.css';

function App() {
  return (
    <main>
      <header>
        <a href="" className="logo">MyBlog</a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>
      <div className="post">
        <div className="image">
         <img src="https://techtowords.com/wp-content/uploads/2023/06/image-17.png" alt=""></img>
        </div>
        <div className="texts">
          <h2>How to write a technical blog post</h2>    
          <p className="info">
            <a href="" className="author">Rizèl Scarlett</a>  
            <time>Posted on Jun 7, 2023 • Updated on Jun 10, 2023</time>
          </p>  
          <p className="summary">Technical skill and content creation are equally important for your software development or career. Creating technical content can make it easier to land jobs, get promoted, and influence the direction of our industry because it enables hiring managers and other tech leaders to take a peek into your brain and your thought process.</p>
        </div>
      </div>
      <div className="post">
        <div className="image">
          <img src="https://techtowords.com/wp-content/uploads/2023/06/image-17.png" alt=""></img>
        </div>
        <div className="texts">
          <h2>How to write a technical blog post</h2>    
          <p className="info">
            <a href="" className="author">Rizèl Scarlett</a>  
            <time>Posted on Jun 7, 2023 • Updated on Jun 10, 2023</time>
          </p>  
          <p className="summary">Technical skill and content creation are equally important for your software development or career. Creating technical content can make it easier to land jobs, get promoted, and influence the direction of our industry because it enables hiring managers and other tech leaders to take a peek into your brain and your thought process.</p>
        </div>
      </div>
      <div className="post">
        <div className="image">
          <img src="https://techtowords.com/wp-content/uploads/2023/06/image-17.png" alt=""></img>
        </div>
        <div className="texts">
          <h2>How to write a technical blog post</h2>    
          <p className="info">
            <a href="" className="author">Rizèl Scarlett</a>  
            <time>Posted on Jun 7, 2023 • Updated on Jun 10, 2023</time>
          </p>  
          <p className="summary">Technical skill and content creation are equally important for your software development or career. Creating technical content can make it easier to land jobs, get promoted, and influence the direction of our industry because it enables hiring managers and other tech leaders to take a peek into your brain and your thought process.</p>
        </div>
      </div>
      
    </main>
  );
}

export default App;