import hasAccountReducer from "./reducers/hasAccount.js";
import loginReducer from "./reducers/login";
import friendsListReducer from "./reducers/friendsList";
import getPostsReducer from "./reducers/getPosts";
import PostReducer from "./reducers/post";
import getFriendsListReducer from "./reducers/getFriendList";
import deletePostReducer from "./reducers/deletePost";
import getFriendDetailsReducer from "./reducers/getFriendDetails";
import acceptFriendReducer from "./reducers/acceptFriend";
import declineFriendReducer from "./reducers/declineFriend";
import searchPeopleReducer from "./reducers/searchPeople";
import getAllFriendsReducer from "./reducers/getAllFriends";
import getCommentsReducer from "./reducers/getComments";
import {combineReducers} from "redux";

import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

const persistConfig = {
    key: "root",
    storage :sessionStorage,
    whitelist: ['login','userDetails']
}

const rootReducer = combineReducers({
    hasAccount: hasAccountReducer,
    login : loginReducer,
    post: PostReducer,
    friendsList : friendsListReducer,
    getPosts : getPostsReducer,
    getFriendsList : getFriendsListReducer,
    deletePost: deletePostReducer,
    getFriendDetails: getFriendDetailsReducer,
    acceptFriend:acceptFriendReducer,
    declineFriend:declineFriendReducer,
    searchPeople:searchPeopleReducer,
    getAllFriends:getAllFriendsReducer,
    getComments:getCommentsReducer
});

export default persistReducer(persistConfig,rootReducer);