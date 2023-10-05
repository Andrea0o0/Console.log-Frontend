import React,{useState, useEffect, useContext} from "react";
import { useOutletContext, Link } from "react-router-dom";
import commentService from "../../services/commentService";
import Loading from '../../assets/images/Logo/Loading.gif'
import YodaHappy from "../../assets/images/Yoda/Yoda happy.svg"
import toast from 'react-hot-toast';
import { AuthContext } from "../../context/AuthContext";

export default function Discussions(){
    const { isLoggedIn } = useContext(AuthContext); 

    const {kata} = useOutletContext();
    const [discussions,setDiscussions] = useState(undefined)
    const [userdiscussion,setUserDiscussion] = useState(undefined)
    const [loading,setLoading] = useState(true)
    const [error, setError] = useState(false);
    const [newDiscussion,setNewDiscussion] = useState('')

    const getDiscussions = async () => {
        try {
          const response = await commentService.commentsKata(kata._id);
          setDiscussions(response);
          setLoading(false);
          setError(false);
        } catch (error) {
          setLoading(false);
          setError(true)
        }
      }     
      
      const handleOwnDiscussions = async () => {
        try {
          const response = await commentService.commentUser(kata._id)
          setUserDiscussion(response)
          console.log(response)
          setLoading(false);
          setError(false);
        } catch (error) {
          setLoading(false);
          setError(true)
        }
      }  

        const handleDeleteDiscussion = async () => {
            try {
                await commentService.deleteComment(userdiscussion._id);
                console.log('hi')
                setLoading(false);
                setError(false);
            } catch (error) {
                setLoading(false);
                setError(true)
            }
        }

      useEffect(() => {
        getDiscussions()
        handleOwnDiscussions()
        console.log(userdiscussion)
        // eslint-disable-next-line
      }, [])

      const handleNewComment = async () => {
          try {
            setLoading(true)
            const response = await commentService.createComment({kata:kata._id,comment:newDiscussion});
            setNewDiscussion('')
            setDiscussions(response)
            setLoading(false);
            setError(false);
              toast.success("Comment added",{style:{backgroundColor:'#1a1e24', color:'white'}})
          } catch (error) {
            setLoading(false);
            toast.error("Sorry We couldn't update your username",{style:{backgroundColor:'#1a1e24', color:'white'}})
          }  
      }

    const textInput = 'text-white text-center px-2 pb-1 rounded-full bg-background-lightcolor w-4/5'

    return (
        <>
            {isLoggedIn ?
            <>
            {loading && <div className='flex justify-center mt-20'><img width='10%' src={Loading} alt='loading'/></div>}
            {!loading && discussions && 
            <div className="flex flex-col items-center">
            {userdiscussion !== undefined ? 
                <>
                    <div className='kataComment flex flex-col items-center text-white ml-2 my-6'>
                        <p className='text-sm my-2'>My comment</p>
                        <div className="kataDiscussions border-1 rounded-lg">
                            <div className="m-4 flex flex-wrap justify-center">
                                <div className='w-11/12 flex flex-wrap justify-center'>
                                    <div className="divKataDiscussions flex justify-center items-center text-white w-3/5 mb-2">
                                        <img className=' rounded-full' width='10%' src={userdiscussion.user.image} alt={`Image_${userdiscussion.user.username}`}/>
                                        <h3 className="ml-4 text-sm p-1 px-10 rounded-full">{`@${userdiscussion.user.username}`}</h3>
                                    </div>  
                                <p className={`pt-1 ${textInput}`}>{userdiscussion.comment}</p>
                                <>
                                  <button className={`text-sm p-1.5 px-6 mt-2 mx-2 bg-background-lightcolor rounded-full border-1 border-background-lightcolor hover:border-white hover:text-white`} onClick={handleNewComment}>Edit</button>  
                                  <button className={`text-sm p-1.5 px-6 mt-2 bg-background-lightcolor rounded-full border-1 border-background-lightcolor hover:border-white hover:text-white`} onClick={handleDeleteDiscussion}>Delete</button>
                                </>
                                
                                </div>
                            </div>   
                        </div>
                    </div>
                </>:
                <>
                    <div className='kataComment flex flex-col items-center text-white w-3/4 ml-2 my-6'>
                        <p className='text-sm my-2'>Write a comment</p>
                        <textarea className={textInput} type="text" name="search"  placeholder='Wow Amazing kataaa! :D' onChange={(e) => setNewDiscussion(e.target.value)}/>
                        <button className={`text-sm p-1.5 px-6 mt-2 bg-background-lightcolor rounded-full border-1 border-background-lightcolor hover:border-white hover:text-white`} onClick={handleNewComment}>Add comment</button>
                    </div>
                </>
                }
                {discussions.length > 0 ? 
                <>
                <div className="kataDiscussions border-1 rounded-lg">
                    {discussions.sort((a,b)=>a.updatedAt - b.updatedAt).reverse().map((elem,i) => {
                        return elem.user !== null && elem.user._id !== userdiscussion.user._id  &&
                        <div key={i} className="m-4 flex flex-wrap justify-center">
                            <div className='w-11/12 flex flex-wrap justify-center'>
                                <div className="divKataDiscussions flex justify-center items-center text-white w-3/5 mb-2">
                                    <img className=' rounded-full' width='10%' src={elem.user.image} alt={`Image_${elem.user.username}`}/>
                                    <h3 className="ml-4 text-sm p-1 px-10 rounded-full">{`@${elem.user.username}`}</h3>
                                </div>  
                            <p className={`pt-1 ${textInput}`}>{elem.comment}</p>
                            </div>
                           
                        </div>})}
                </div>                
                </>:
                <>
                    <div className="flex justify-center my-4">
                        <div className="flex flex-wrap w-3/4 justify-center p-3 pb-8 rounded-full bg-background-lightcolor">
                            <img width='20%' className="m-2" src={YodaHappy} alt='yoda happy'/>
                            <h3 className="w-4/5 text-center text-white font-normal">No discussions yet<br/>A Jedi uses the Force for knowledge and defense, never for attack<br/>Comments cautiously my young padawan</h3>
                        </div>
                    </div>
                </>}
            </div>}
            </>:
            <>
            <div className="flex justify-center my-4">
                <Link to='/signup' className="flex flex-wrap w-3/4 justify-center p-3 pb-8 rounded-full bg-background-lightcolor hover:w-4/5 yoda">
                    <img width='20%' className="m-2" src={YodaHappy} alt='yoda happy'/>
                    <h3 className="w-4/5 text-center text-white font-normal">Sorry stranger you don't have access to the discussions<br/>Signup first</h3>
                </Link>
            </div>
            </>}
            {error && <p>Something went wrong. Couldn't find your kata</p>}
        </>
    )
}