async function test() {
    const res = await axios.get('https://hack-or-snooze-v3.herokuapp.com/stories')
    console.log(res.data)
}


//This creates a user using the API's signup format 
async function signUpTest(name, username, password) {
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/signup',
        /**                                    this is the URL the API provides */
        {
            user: { name, username, password }
            /** this is the format that the API requires */
        })
    console.log('response from post signup is:', res.data)
    /** this returns the new user that was created: 
     {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvcDIiLCJpYXQiOjE2MzYzMDYwNTh9.dJXzkCJTHe8kVlyGPBvvb3dagPTfXjU8mOaU_PVGPK4",
    user: {
        createdAt: "2021-11-07T17:27:38.260Z"
        favorites: Array(0)
        name: "username"  --> what was inputed in the parameter
        stories: Array(0)
        updatedAt: "2021-11-07T17:27:38.260Z"
        username: "name"  ->what was inputed in the parameter }
     }
    */
}

//token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvcDN1c2VybmFtZSIsImlhdCI6MTYzNjMwNzA0N30.447M2xf6WjY3RRn5yjJCtsJzSb6TSfHA2xr2I8sh5jU"
//username: kop3username
//name: kop3name
//password: 12345

//will create a new story with the parameters
// async function createNewStoryTest2(token, author, title, url) {
//     //the format the API wants the story in
//     const input = {
//         token,
//         story: {
//             author,
//             title,
//             url,
//         }
//     }
//     const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/stories', input)
//     console.log(res)
// }





response.data.stories[x] from BASE_URL/stories : 
{author: "this is an author"
createdAt: "2021-11-13T01:47:11.217Z"
storyId: "a6a1084a-e1fc-4031-8c96-c54112d00776"
title: "this is a test"
updatedAt: "2021-11-13T01:47:11.217Z"
url: "https://google.com"
username: "usernamekop21"}
