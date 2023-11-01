import React, { useState,useEffect } from 'react'
import Card from './Card'
import OtherPlayerCard from './OtherPlayerCard'
import { Link } from 'react-router-dom';
const Game = ({state,account}) => {
  const [reveal,setreveal]=useState(false); 
  const [playerDetails, setPlayerDetails] = useState([]); 
  const [winnerarr,setwinnerarr]=useState([]); 
  const betval=0.0008;
  const {contract}=state;
  
  const onClickHandler=()=>{
    setreveal(true);
    setTimeout(async ()=>{
      await contract.select_Winner();
      const winnerarr=await contract.getwinners_arr();
      setwinnerarr(winnerarr);
    },5000);
  }

  const exitHandler=async ()=>{
    await contract.exit_game();
  }


  useEffect(()=>{
    const getinfo=async()=>{
    const getplayers_arr=await contract.getplayers_arr();
    console.log(getplayers_arr);
    setPlayerDetails(getplayers_arr);
    };

    contract && getinfo();
   },[contract,playerDetails.length]);


  return (
    <div 
    className='bg-[url("https://png.pngtree.com/thumb_back/fh260/background/20200728/pngtree-poker-casino-betting-dice-chips-border-background-image_372331.jpg")] bg-cover h-screen'>
      
      <Link to="/takeplayers">
      <button onClick={exitHandler} className="hover:bg-[gold] hover:text-[red] bg-[red] text-[white]  text-[1.2rem] font-bold py-2 px-4 absolute top-0 left-0 mt-6 ml-6 flex rounded">
     <div className="flex">
         Exit Game
     </div>
       </button>
      </Link>

      <div className="bg-[#d3aeae] rounded-lg flex absolute right-0 mr-8 mt-6 p-2">
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
         className="w-[1.5rem] h-[1.5rem] mr-2" alt=""/>
        <p className="font-bold">{account}</p>
      </div>

    
     {
      playerDetails.map((player)=>{
        return (account===player.player_address && 
          <div>
          <p className='flex justify-center absolute top-0 ml-[43rem] mt-[23rem]'>
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGgXkZI3Ys6cH6-y87MXGl4PWlIggTHTITw&usqp=CAU"
             className='w-[2rem] h-[1.8rem] rounded-[50%]' alt=''/>
             <span className='font-bold text-[gold] ml-2 text-[1.2rem]'>{player.name}</span></p>
          <div className='flex absolute bottom-0 ml-[26rem] mb-8'>
          <Card suit={player.card_suit1.toString()} value={player.card_num1.toString()}  className="m-4"/>
          <Card suit={player.card_suit2.toString()} value={player.card_num2.toString()}  className="m-4"/>
          <Card suit={player.card_suit3.toString()} value={player.card_num3.toString()}  className="m-4"/>
          </div>
          </div>)
      })
     }
     

     <button onClick={onClickHandler} className="hover:bg-[gold] hover:text-[red] bg-[red] text-[white]  text-[1.2rem] font-bold py-2 px-4 absolute top-0 mt-6 ml-[44rem] flex rounded">
     <div className="flex">
         Reveal All
     </div>
      </button>

     <div className="absolute bottom-0 right-0 mb-8 mr-12  flex">
     <p className="ml-6 mt-6 p-2 text-[white] font-bold">Game Value :</p>
     <div className="bg-[#FFFDD0] rounded-lg flex ml-2 mt-6 p-2">
       <p className="font-bold text-[green]">{(4*betval).toString()} Eth</p>
     </div>
      </div>

      <div className="absolute bottom-0 left-0 mb-8 mr-12 flex">
     <p className="ml-6 mt-6 p-2 text-[black] font-bold">My Bet :</p>
     <div className="bg-[#FFFDD0] rounded-lg flex ml-2 mt-6 p-2">
       <p className="font-bold text-[green]">{betval.toString()} Eth</p>
     </div>
      </div>

 
      <div className='flex justify-evenly pt-[8rem]'>
      {
         playerDetails.map((player)=>{
          return (account!==player.player_address && 
            <div>
             <p className='flex justify-center'>
               <img src="https://i.pinimg.com/736x/6d/1e/bf/6d1ebf50b4a2c395dabbd4f8c1670c4b.jpg"
                 className='w-[1.8rem] h-[1.6rem] rounded-[50%]' alt=''/>
              <span className='font-bold text-[gold] ml-2'>{player.name}</span>
             </p>
               <div className='flex'>
                 <OtherPlayerCard suit={player.card_suit1.toString()} value={player.card_num1.toString()} reveal={reveal} className="m-3 w-[3rem]"/>
                 <OtherPlayerCard suit={player.card_suit2.toString()} value={player.card_num2.toString()}  reveal={reveal} className="m-3 w-[3rem]"/>
                 <OtherPlayerCard suit={player.card_suit3.toString()} value={player.card_num3.toString()}  reveal={reveal} className="m-3 w-[3rem]"/>
              </div>
          </div>
          )
         })
      }
      
      {/* <div>
      <p className='flex justify-center'>
        <img src="https://i.pinimg.com/736x/6d/1e/bf/6d1ebf50b4a2c395dabbd4f8c1670c4b.jpg"
        className='w-[1.8rem] h-[1.6rem] rounded-[50%]' alt=''/>
        <span className='font-bold text-[gold] ml-2'>Player-4</span></p>
      <div className='flex'>
       <OtherPlayerCard suit="1" value="0" reveal={reveal} className="m-3 w-[3rem]"/>
       <OtherPlayerCard suit="0" value="12"  reveal={reveal} className="m-3 w-[3rem]"/>
       <OtherPlayerCard suit="4" value="9"  reveal={reveal} className="m-3 w-[3rem]"/>
      </div>
      </div>

      <div>
      <p className='flex justify-center'>
        <img src="https://i.pinimg.com/originals/8e/d4/04/8ed4040e06e68818a07c3e15ac7c18dc.jpg"
        className='w-[1.8rem] h-[1.8rem] rounded-[50%]' alt=''/>
        <span className='font-bold text-[gold] ml-2'>Player-2</span></p>
      <div className='flex'>
      <OtherPlayerCard suit="1" value="0" reveal={reveal} className="m-3 w-[3rem]"/>
       <OtherPlayerCard suit="0" value="12"  reveal={reveal} className="m-3 w-[3rem]"/>
       <OtherPlayerCard suit="4" value="9"  reveal={reveal} className="m-3 w-[3rem]"/>
      </div>
      </div>

      <div>
      <p className='flex justify-center'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlYZQyr7v9wU07m_3mytH0EDrFZeNhpGGnnxyzNLTrPTKEASMU764CVs3CQrvHW57YHkA&usqp=CAU"
        className='w-[1.8rem] h-[1.6rem] rounded-[50%]' alt=''/>
        <span className='font-bold text-[gold] ml-2'>Player-3</span></p>
      <div className='flex'>
      <OtherPlayerCard suit="1" value="0" reveal={reveal} className="m-3 w-[3rem]"/>
       <OtherPlayerCard suit="0" value="12"  reveal={reveal} className="m-3 w-[3rem]"/>
       <OtherPlayerCard suit="4" value="9"  reveal={reveal} className="m-3 w-[3rem]"/>
      </div>
      </div> */}

      </div>

      <div className='flex justify-center absolute top-0 ml-[40rem] mt-[16rem]'>
         {
           winnerarr.length===1 && winnerarr.map(winner=>{
            return (winner===account &&
            <p className='text-[gold] font-bold text-[3rem] flex'>
            <span className='mt-4 mr-2'>YOU WON {(4*betval).toString()} ETH </span>
            <img src='https://images.emojiterra.com/google/android-oreo/512px/1f389.png' alt='' className='w-[5rem] h-[5rem]'/>
           </p> )
           })
         }


         {
           winnerarr.length===1 && winnerarr.map(winner=>{
            return (winner!==account &&
              <p className='text-[pink] font-bold text-[3rem] flex'>
                 <span className='mt-4 mr-2'>YOU LOST... </span>
              </p>)
           })
         }   
         
      </div>

    
      {
           winnerarr.length>1 && winnerarr.map(winner=>{
            return (winner===account && 
              <div className='flex justify-center absolute top-0 ml-[30rem]  mt-[17rem]'>
              <p className='text-blue-300 font-bold text-[2rem] flex'>
                    <span className='mt-4 mr-2'>YOU'RE ONE AMONG THE WINNERS...</span>
                 </p>
              </div>
            )
           })
      }


    </div>
  )
}

export default Game