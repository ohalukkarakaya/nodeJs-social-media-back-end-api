# nodeJs-social-media-back-end-api
social media back end

# Users

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/auth/register | `POST` | { username: 'foo', email:'test@email.com', password: '1234' } | Creates a new user. |
| /api/auth/login | `POST` | { email: 'test@email.com', password:'1234' } | For Login. |
| /api/users/:user_id | `PUT` | header: {userId: 'user Id'}, body: { username: 'TestUser', email:'test@email.com', password: 'password', profilePicture: 'STRING', coverPicture: 'STRING', isAdmin: false, desc: 'Test Description' } | For Update User Infos. |
| /api/users/:user_id | `DELETE` | header: {userId: 'user Id'} | For Delete User. |
| /api/users/:user_id | `GET` | Empty | For Get One User. |

# Follow & UnFollow

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/users/:target_user_id/follow | `PUT` | header: {userId: 'userId'} | follows if user doesn't allready follows target user. |
| /api/users/:target_user_id/unfollow | `PUT` | header: {userId: 'userId'} | unfollows if user allready follows target user. |

# Post

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/post/:post_id| `GET` | Empty | gets one spesific post |
| /api/post| `POST` | body: {userId: 'userId', desc: 'STRING', img: 'STRİNG'} | creates new post |
| /api/post/:post_id| `PUT` | body: {userId: 'userId', desc: 'STRING', img: 'STRİNG'} | updates post |
| /api/post/:post_id| `DELETE` | header: {userId: 'userId'} | deletes post |
| /api/post/timeline/all| `GET` | header: {userId: 'userId'} | gets all posts which belongs to followed users |

# Like & UnLike

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/post/post_id/like| `PUT` | header: {userId: 'userId'} | likes a post if user didin't like allready but unlikes if so. |

