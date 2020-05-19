import axios from 'axios';

const URL = "https://sonido.herokuapp.com/graphql";

export const login = async ({ email, password }) => {
  try {
    const graphqlQuery = {
      query: `
          {
            login(loginData: {email: "${email}", password: "${password}"}) {
              token
              userId
            }
          }        
        `
    };
    const { data: { data: { login } } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return { ...login };
  } catch ({ response: { data } }) {
    if (data.errors.length > 0) {
      return data.errors[0];
    }
  }
}

export const singup = async ({ username, email, password, confirmPassword }) => {
  try {
    const graphqlQuery = {
      query: `
        mutation{
          signup(signupData: {
            email: "${email}", 
            username:"${username}", 
            password: "${password}", 
            confirm_password: "${confirmPassword}"
          }) {
            token, 
            userId
          }     
        }
        `
    };
    const { data: { data: { signup } } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return { ...signup };
  } catch ({ response: { data } }) {
    if (data.errors.length > 0) {
      return data.errors[0];
    }
  }
}

export const home = async () => {
  try {
    const graphqlQuery = {
      query: `
      {
        home {
          users {
              _id,
            username,
            createdAt
          },
          receivedDedications {
            _id,
            sender{
              _id,
              username
            },
            receiver,
            previewUrl,
            artworkUrl,
            trackName,
            artistName,
            createdAt
          },
          sendedDedications {
            _id,
            receiver{
              _id,
              username
            }
            sender,
            previewUrl,
            artworkUrl,
            trackName,
            artistName,
            createdAt
          },
          notifications{
            sender,
            receiver,
            type,
            dedicateId{
              _id,
              previewUrl,
              trackName
            },
            createdAt
          }
        }  
      }
    `
    }
    const { data: { data: home } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return home;
  } catch ({ response }) {
    console.log(response)
  }
}

export const getTracks = async (term) => {
  try {
    const { data: { results } } = await axios.get(`https://itunes.apple.com/search?term=${term}&limit=1`, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      }
    });
    return results;
  } catch (error) {
    console.log(error.response)
  }
}

export const searchUsers = async (term) => {
  try {
    const graphqlQuery = {
      query: `
      {
        searchUser(term: "${term}"){
          _id,
          username,
          name
        }
      }
      `
    }
    const { data: { data: { searchUser } } } = await axios.post(URL, JSON.stringify(graphqlQuery));
    return searchUser;
  } catch (error) {
    console.log(error.response);
  }
}

export const dedicateSong = async (receiverId, previewUrl, artworkUrl100, trackName, artistName) => {
  try {
    const graphqlQuery = {
      query: `
        mutation {
          dedicate(dedicateData:{
            receiver: "${receiverId}",
            previewUrl: "${previewUrl}",
            artworkUrl: "${artworkUrl100}",
            trackName: "${trackName}",
            artistName: "${artistName}"
          }) {
              _id
          }
        }  
      `
    };
    const { data } = await axios.post(URL, JSON.stringify(graphqlQuery));
    console.log(data);
    return;
  } catch (error) {
    console.log(error.response);
  }
}

