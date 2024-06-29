import barn from './images/barn.png';
import house from './images/house.png';

import plot from './images/plot.png';

import carrot from './images/carrot.png';
import corn from './images/corn.png';
import lettuce from './images/lettuce.png';
import rice from './images/rice.png';
import tomato from './images/tomato.png';
import wheat from './images/wheat.png';

import chicken from './images/chicken.png';
import cow from './images/cow.png';
import duck from './images/duck.png';
import pig from './images/pig.png';
import sheep from './images/sheep.png';

export default function FarmImages() {
  return (
    <>
      <img src={ barn } alt='barn' style={{ position: 'absolute', width: '17%', left: '-7px', bottom: '5px'}}/>
      <img src={ house } alt='house' style={{ position: 'absolute', width: '16.5%', right: '-4px', top: '-5px'}}/>
      
      {/* Left Plot */}
      <img src={ plot } alt='plot' className='plot' style={{ marginTop: '1vh' }}/>
      <img src={ plot } alt='plot' className='plot' style={{ marginTop: '24vh' }}/>
      <img src={ plot } alt='plot' className='plot' style={{ marginTop: '47vh' }}/>
      {/* Right Plot */}
      <img src={ plot } alt='plot' className='plot' style={{ right: '20px', bottom: '47vh' }}/>
      <img src={ plot } alt='plot' className='plot' style={{ right: '20px', bottom: '24vh' }}/>
      <img src={ plot } alt='plot' className='plot' style={{ right: '20px', bottom: '1vh' }}/>

      <img src={ carrot } alt='carrot' className='crops' id='carrot'/>
      <img src={ corn } alt='corn' className='crops' id='corn'/>
      <img src={ lettuce } alt='lettuce' className='crops' id='lettuce'/>
      <img src={ rice } alt='rice' className='crops' id='rice'/>
      <img src={ tomato } alt='tomato' className='crops' id='tomato'/>
      <img src={ wheat } alt='wheat' className='crops' id='wheat'/>

      <img src={ chicken } alt='chicken' id='chicken'/>
      <img src={ cow } alt='cow' id='cow'/>
      <img src={ duck } alt='duck' id='duck'/>
      <img src={ pig } alt='pig' id='pig'/>
      <img src={ sheep } alt='sheep' id='sheep'/>

    </>
  );
}