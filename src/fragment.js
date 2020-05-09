
export const USER_FRAGMENT = `
    id
    username
    avatar
`;

export const FILE_FRAGMENT =`
    fragment FileParts on File{
        id
        url
    }
`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post{
        id
        location
        caption
        user{
            id
            username
        }
        files{
            id
            url
        }
        likes{
            id
        }
        comment{
            id
            text
            user{
                id
                username
            }
        }
    }
`;
export const COMMENT_FRAGMENT = `
    fragment CommentPart on Comment{
        id
        text
        user{
            id
            username
        
        }
    }
`
export const ROOM_FRAGMENT =`
    fragment RoomParts on Room{
        id
        participants {
            id
            username
            avatar
            
        }
        messages{
           id
           text
           to{
               id
               username
               avatar
           }
           from{
            id
            username
            avatar
            }
        }
    }
`;

export const MESSAGE_FRAGMENT=`
    id
    text
    to{
        ${USER_FRAGMENT}
    }
    from{
        ${USER_FRAGMENT}
    }
`