import React, { useState, useEffect }  from "react";
import Alien_Saucers from '../assets/images/avatars/Alien_Saucers.jpg'
import Angry_Monster from '../assets/images/avatars/Angry_Monster.jpg'
import Bull_Dog from '../assets/images/avatars/Bull_Dog.jpg'
import Chubby_Cactus from '../assets/images/avatars/Chubby_Cactus.jpg'
import Cocker from '../assets/images/avatars/Cocker.jpg'
import Cross_Virgin from '../assets/images/avatars/Cross_Virgin.jpg'
import Cute_Cactus from '../assets/images/avatars/Cute_Cactus.jpg'
import Cute_Monster from '../assets/images/avatars/Cute_Monster.jpg'
import Dracula from '../assets/images/avatars/Dracula.jpg'
import Droplet_Eyes from '../assets/images/avatars/Droplet_Eyes.jpg'
import Funny_Heart from '../assets/images/avatars/Funny_Heart.jpg'
import Golden from '../assets/images/avatars/Golden.jpg'
import GoodVibes from '../assets/images/avatars/GoodVibes.jpg'
import Green_Virgin from '../assets/images/avatars/Green_Virgin.jpg'
import Happy_Alien from '../assets/images/avatars/Happy_Alien.jpg'
import Heart_Cactus from '../assets/images/avatars/Heart_Cactus.jpg'
import Husky from '../assets/images/avatars/Husky.jpg'
import Joker from '../assets/images/avatars/Joker.jpg'
import Laughing_Alien from '../assets/images/avatars/Laughing_Alien.jpg'
import Mommy from '../assets/images/avatars/Mommy.jpg'
import Pastor from '../assets/images/avatars/Pastor.jpg'
import Pink_Slug from '../assets/images/avatars/Pink_Slug.jpg'
import Pomeranian from '../assets/images/avatars/Pomeranian.jpg'
import Pumpkin from '../assets/images/avatars/Pumpkin.jpg'
import Rosalia from '../assets/images/avatars/Rosalia.jpg'
import Rounded_Cactus from '../assets/images/avatars/Rounded_Cactus.jpg'
import Schnauzer from '../assets/images/avatars/Schnauzer.jpg'
import Simpons_Aliens from '../assets/images/avatars/Simpsons_Aliens.jpg'
import Simpsons_Squirrel from '../assets/images/avatars/Simpsons_Squirrel.jpg'
import Slime_Monster from '../assets/images/avatars/Slime_Monster.jpg'
import Spiderman_Hand from '../assets/images/avatars/Spiderman_Hand.jpg'
import Unibrowed from '../assets/images/avatars/Unibrowed.jpg'
import Witch from '../assets/images/avatars/Witch.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Avatar({setNewImage}){

    const images = [
        {url:Alien_Saucers,title:Alien_Saucers},
        {url:Angry_Monster ,title:Angry_Monster},
        {url:Bull_Dog ,title:Angry_Monster},
        {url:Chubby_Cactus ,title:Angry_Monster},
        {url:Cocker ,title:Angry_Monster},
        {url:Cross_Virgin ,title:Angry_Monster},
        {url:Cute_Cactus ,title:Angry_Monster},
        {url:Cute_Monster ,title:Angry_Monster},
        {url:Dracula ,title:Angry_Monster},
        {url:Droplet_Eyes ,title:Angry_Monster},
        {url:Funny_Heart ,title:Angry_Monster},
        {url:Golden ,title:Angry_Monster},
        {url:GoodVibes ,title:Angry_Monster},
        {url:Green_Virgin ,title:Angry_Monster},
        {url:Happy_Alien ,title:Angry_Monster},
        {url:Heart_Cactus ,title:Angry_Monster},
        {url:Husky ,title:Angry_Monster},
        {url:Joker ,title:Angry_Monster},
        {url:Laughing_Alien ,title:Angry_Monster},
        {url:Mommy ,title:Angry_Monster},
        {url:Pastor ,title:Angry_Monster},
        {url:Pink_Slug ,title:Angry_Monster},
        {url:Pomeranian ,title:Angry_Monster},
        {url:Pumpkin ,title:Angry_Monster},
        {url:Rosalia ,title:Angry_Monster},
        {url:Rounded_Cactus ,title:Angry_Monster},
        {url:Schnauzer ,title:Angry_Monster},
        {url:Simpons_Aliens ,title:Angry_Monster},
        {url:Simpsons_Squirrel ,title:Angry_Monster},
        {url:Slime_Monster ,title:Angry_Monster},
        {url:Spiderman_Hand ,title:Angry_Monster},
        {url:Unibrowed ,title:Angry_Monster},
        {url:Witch ,title:Angry_Monster}
    ]

    const [image,setImage] = useState(images[0])
    const [index,setIndex] = useState(0)

    const handleImage = () => {
        setImage(images[index])
    }

    useEffect(() => {
        handleImage()
        // eslint-disable-next-line
    },[index])
    
    const handleRight = () => {
        setIndex(prev => prev<images.length-1 ? prev + 1: 0)
    }

    const handleLeft = () => {
        setIndex(prev => prev>0 ? prev - 1: images.length-1)
    }

    const handleSelect = (image) => {
        setNewImage(image)
    }
    
    return (
        <>

            <div className="flex justify-center">
                <button className="mr-2" onClick={handleLeft}><FontAwesomeIcon icon="fa-solid fa-angle-left fa-2xl" color='white'/></button>
                <div><img className="rounded-lg cursor-pointer" onClick={()=>handleSelect(index)} src={images[index].url} alt={images[index].title}/></div>            
                <button className="ml-2" onClick={handleRight}><FontAwesomeIcon icon="fa-solid fa-angle-right" color='white'/></button>
            </div>
            <button className='text-sm p-1.5 px-6 my-4 bg-background-lightcolor rounded-full border-1 border-background-lightcolor hover:border-white focus:border-white' onClick={() => handleSelect(images[index].url)}>Save new Avatar</button>
        </>
        
        
    )
}

