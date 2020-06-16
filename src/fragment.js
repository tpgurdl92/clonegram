
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
        participantA {
            id
            username
            avatar
            itsMe
            
        }
        participantB{
            id
            username
            avatar
            itsMe
        }
        messages{
           id
           text
           to{
               id
               username
               avatar
               itsMe
           }
           from{
            id
            username
            avatar
            itsMe
            }
            createdAt 
            updatedAt
        }
        admissionA
        admissionB
        showMessageDateA
        showMessageDateB
        lastCheckTimeA
        lastCheckTimeB
        createdAt 
        updatedAt
    }
`;

export const MESSAGE_FRAGMENT=`
    fragment MessagePart on Message{
        id
        text
        to{
            id
            username
            avatar
            itsMe
        }
        from{
            id
            username
            avatar
            itsMe    
        }
        createdAt
        room{
            id
        }
    }
`