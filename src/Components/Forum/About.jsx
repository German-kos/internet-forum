import "./CSS-Files/About.css";
function About() {
  return (
    <div className="AboutContainer">
      <h2 style={{ margin: "20px auto" }}>Foreword</h2>
      <p>
        My name is German Kostiakov. As part of the midterm project in the
        HackerU's .NET fullstack development course, we the students were tasked
        with creating a website with the knowledge we've accumulated over the
        first quarter of the course.
      </p>
      <p>
        The webside was to be created with JS' library of React, and styled with
        css.
      </p>
      <p>
        The theme that I have chosen was an internet forum. A messaging board.
      </p>
      <p>
        I chose to create a forum since I am familiar with the concept, having
        spent a lot of time using them.
      </p>
      <h2 style={{ margin: "20px auto" }}>About the Project</h2>
      <p>
        The website's main feature which the other more minor features are built
        around- is the aspect of messaging.
      </p>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>Signing In</h3>
      <p>Here is a list of the existing users:</p>
      <table style={{ border: "1px solid black" }}>
        <tr>
          <th style={{ borderRight: "1px solid black" }}>Username</th>
          <th style={{ borderRight: "1px solid black" }}>Password</th>
          <th>Notes</th>
        </tr>
        <tr>
          <td style={{ borderRight: "1px solid black" }}>Administrator</td>
          <td style={{ borderRight: "1px solid black" }}>112233</td>
          <td>The admin user</td>
        </tr>
        <tr>
          <td style={{ borderRight: "1px solid black" }}>John1</td>
          <td style={{ borderRight: "1px solid black" }}>112233</td>
          <td>A regular user</td>
        </tr>
        <tr>
          <td style={{ borderRight: "1px solid black" }}>Jane1</td>
          <td style={{ borderRight: "1px solid black" }}>123123</td>
          <td>A regular user</td>
        </tr>
        <tr>
          <td style={{ borderRight: "1px solid black" }}>Banned</td>
          <td style={{ borderRight: "1px solid black" }}>123123</td>
          <td>A regular user that is banned by default.</td>
        </tr>
      </table>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>The Hierarchy</h3>
      <p>
        The message hierarchy is- Comments are a part of a thread, and threads
        are a part of a category.
      </p>
      <p>
        Any user can comment on any thread, as well as create their own thread.
      </p>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>The Users</h3>
      <p>
        Users are allowed to remove their own comments, and the threads they've
        created, but not other's. This right is reserved the the websites
        administrator.
      </p>
      <p>
        Users can also send PMs-private messages, between eachother. This serves
        as sort of a private chat that isn't displayed to anyone but the sender
        and the recipient.
      </p>
      <p></p>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>The Administrator</h3>
      <p>The administrator is the site's overseer.</p>
      <p>The tools that the administrator possesses are:</p>
      <ul style={{ maxWidth: "600px", marginLeft: "20px" }}>
        <li style={{ marginLeft: "20px" }}>Banning and unbanning users.</li>
        <li style={{ marginLeft: "20px" }}>Deleting any thread.</li>
        <li style={{ marginLeft: "20px" }}>Deleting any comment.</li>
        <li style={{ marginLeft: "20px" }}>Adding categories to the forum.</li>
      </ul>
      <p>
        Other than these the administrator's user works like any other regular
        user.
      </p>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>The Drawer</h3>
      <p>
        The drawer, indicated by the hamburger menu icon, is the site's
        navigation bar. It is a nice unintrusive design that accomanies the user
        throughout the site as part of it's layout.
      </p>
      <p>Short explanation for the buttons inside:</p>
      <ul style={{ maxWidth: "600px", marginLeft: "20px" }}>
        <li style={{ marginLeft: "20px" }}>
          Home: takes the user to the site's main page.
        </li>
        <li style={{ marginLeft: "20px" }}>
          Profile: takes the user to their profile page.
        </li>
        <li style={{ marginLeft: "20px" }}>
          Messages: takes the user to a page that displays messages they've
          recieved and sent.
        </li>
        <li style={{ marginLeft: "20px" }}>
          Guidelines: takes the user to a page that states the site's rules of
          conduct
        </li>
        <li style={{ marginLeft: "20px" }}>
          About: takes the user to this page, the page that explains how the
          site works.
        </li>
        <li style={{ marginLeft: "20px" }}>
          Users List: takes the administrator to a page that display a list of
          all the users in the website. It is also the ban/unban page. This
          button and page are only accessible for the administrator.
        </li>
      </ul>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>The Searchbar</h3>
      <p>
        With the searchbar, a user can look up a thread by the thread's title,
        and redirect to it when selected.
      </p>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>The Profile Page</h3>
      <p>
        This is the page that display a profile user's profile picture,
        non-sensitive information, the threads they've created, and comments
        they've posted.
      </p>
      <p>There are two versions of a profile page.</p>
      <p>
        The first version is the personal profile page, which will display the
        user's own profile, with sensitive information, in this site's case it's
        just the email.
      </p>
      <p>
        The second version is the public profile page. This version is the same
        except it doesn't display a user's sensitive information. This version
        can be accessed when clicking another user's name when comming across a
        comment or thread of theirs.
      </p>
      <p>
        In the profile page, there's also a list of the user's comments and
        threads. The items on the list are clickable and will redirect the user
        to the correlating comment or thread.
      </p>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>The Messaging System</h3>
      <p>
        The messaging system is a system that allows a private discussion
        between two users, like emailing between two people.
      </p>
      <p>
        To send a private message to another person, the user will go to the
        person's profile page, and click the envelope icon. This will prompt the
        user to fill a form with the message's subject, and content. To view the
        messages the user has sent or recieved, they would click on the drawer
        button tagged as 'Messages'.
      </p>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>Creating a Category</h3>
      <p>
        Creating a category is one of the tools that is only accessible for the
        site's administrator.
      </p>
      <p>
        To create a category the administrator should be in the home page, and a
        button named 'Add a Category' will be displayed before the list of
        categories.
      </p>
      <p>
        Clicking the button the administrator will be prompted to fill a form
        for creating a category.
      </p>
      <p>
        For the image filename field, use one of the following preuploaded image
        names:
      </p>
      <ul style={{ maxWidth: "600px", marginLeft: "20px" }}>
        <li style={{ marginLeft: "20px" }}>1</li>
        <li style={{ marginLeft: "20px" }}>2</li>
        <li style={{ marginLeft: "20px" }}>3</li>
        <li style={{ marginLeft: "20px" }}>4</li>
        <li style={{ marginLeft: "20px" }}>5</li>
        <li style={{ marginLeft: "20px" }}>art</li>
        <li style={{ marginLeft: "20px" }}>discussions</li>
        <li style={{ marginLeft: "20px" }}>hobbies</li>
        <li style={{ marginLeft: "20px" }}>music</li>
        <li style={{ marginLeft: "20px" }}>video-games</li>
      </ul>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>Creating a Thread</h3>
      <p>
        To create a thread, the user should first pick a category. After picking
        a category, a button will be displayed named 'New Thread'.
      </p>
      <p>
        Only a signed in user may create a thread. If the user is not signed in,
        a dialog box will pop up asking the user to sign in.
      </p>
      <p>
        When a signed in user clicks the button, a form will appear, asking for
        the thread's title and content.
      </p>
      <h3 style={{ margin: "20px 0px 5px 0px" }}>Posting a Comment</h3>
      <p>
        To post a comment, the user should first pick a thread to post a comment
        in.
      </p>
      <p>
        In every thread, the comments are displayed in a list of sorts, from
        first to last, and at the bottom of each list there's a blank text field
        for posting their own comment.
      </p>
      <p>
        Note that the text field will only appear for signed in users. If the
        user isn't signed, a text warning that only signed in users may post a
        comment will show instead.
      </p>
    </div>
  );
}
export default About;
