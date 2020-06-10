import React, { useEffect, useState, Fragment } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import FriendDiv from "./FriendDiv/FriendDiv";
import useWindowSize from "../../Custom Hooks/useWindowSize";
import { getAllFriends } from "../../redux/actions/getAllFriends.action";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'


function FriendsBar(props) {

    const size = useWindowSize();
    const { id, friend_array, friend_id, friend_name } = props;
    const all_friends = useSelector(state => state.getAllFriends.all_friends);
    const [friendsToShow, setFriendsToShow] = useState(4)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllFriends(id))
    }, [id, dispatch])

    const { name, user_id, profile_pic } = all_friends;

    return (
        <div className="friends-bar">
            <h3>Friends</h3>
            {name !== undefined && name.length > 5 ? <FontAwesomeIcon
                className="arrow"
                icon={faArrowLeft}
                onClick={
                    () => {
                        if (friendsToShow <= 4) {
                            setFriendsToShow(name.length)
                        }
                        else if(friendsToShow <= 8){
                            setFriendsToShow(4);
                        }
                        else { 
                            setFriendsToShow(friendsToShow - 4)
                        }
                    }}></FontAwesomeIcon> : null}
            {name === undefined ? <LoadingSpinner color="var(--secondary-color)" /> : name.length > 0 ?
                <Fragment>
                    {name.map((el, i) => {
                        if (size.width < 1040) {

                            if (i < friendsToShow && i > (friendsToShow - 5)) {
                                return (<FriendDiv key={i} id={user_id[i]} name={el} img={profile_pic[i]} />)
                            }
                        }
                       
                        else {
                            return (<FriendDiv key={i} id={user_id[i]} name={el} img={profile_pic[i]} />)
                        }
                    })}
                    {name.length > 5 ? <FontAwesomeIcon
                        className="arrow"
                        icon={faArrowRight}
                        onClick={
                            () => {
                                if ((friendsToShow + 1) === name.length) {
                                    setFriendsToShow(friendsToShow + 1)
                                }
                                else if ((friendsToShow + 2) === name.length) {
                                    setFriendsToShow(friendsToShow + 2)
                                }
                                else if ((friendsToShow + 3) === name.length) {
                                    setFriendsToShow(friendsToShow + 3)
                                }
                            
                                else if (friendsToShow >= name.length) {
                                    setFriendsToShow(5);
                                }

                                else {
                                    setFriendsToShow(friendsToShow + 4)
                                }
                            }}
                    ></FontAwesomeIcon>
                        : null}
                </Fragment>
                :
                <p style={{ backgroundColor: "var(--secondary-color)", borderRadius: "7px", width: "90%", height: "70%", padding: "15px", textAlign: "center", fontWeight: "600" }}>

                    {friend_id && !friend_array.includes(friend_id) ? `You can't see ${friend_name}'s friends yet!` : `You have no friends! You can add friends by searching for people in the search bar and then sending them a friend request!`
                    }</p>}

        </div>
    )
}

export default FriendsBar;