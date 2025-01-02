// C:\lkh\project\reactNode\game-frontend\src\pages\Home.jsx

import { Link } from 'react-router-dom'

const Home = () => {
   return (
      <>
         <img className="girl1" src="/images/girl1.png" alt="girl" style={{ width: '415px', height: '415px' }} />

         <div className="middleNav">
            <ul>
               <li>
                  <Link to={`/review`}>리뷰 [ 신규 이벤트 진행중 ! ]</Link>
               </li>
            </ul>
         </div>
      </>
   )
}

export default Home
