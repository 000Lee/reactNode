// C:\lkh\project\reactNode\game-frontend\src\pages\Home.jsx

import { Link } from 'react-router-dom'

const Home = () => {
   return (
      <div style={{ position: 'relative' }}>
         <img className="girl1" src="/images/girl1.png" alt="girl" style={{ width: '415px', height: '415px' }} />
         {/* 나비 */}
         {/* 왼쪽 */}
         <img src="/images/나비.png" className="butterfly" alt="butterfly"></img>
         <img src="/images/나비.png" className="butterfly1" alt="butterfly"></img>
         <img src="/images/나비.png" className="butterfly2" alt="butterfly"></img>
         <img src="/images/나비.png" className="butterfly6" alt="butterfly"></img>
         <img src="/images/나비.png" className="butterfly7" alt="butterfly"></img>
         {/* 오른쪽 */}
         <img src="/images/나비.png" className="butterfly3" alt="butterfly"></img>
         <img src="/images/나비.png" className="butterfly4" alt="butterfly"></img>
         <img src="/images/나비.png" className="butterfly5" alt="butterfly"></img>
         <img src="/images/나비.png" className="butterfly8" alt="butterfly"></img>
         <img src="/images/나비.png" className="butterfly9" alt="butterfly"></img>
         {/* 나비끝 */}
         {/* 화살표 */}
         <div className="arrow">Click Here →</div>
         <div className="middleNav">
            <ul>
               <li>
                  <Link to={`/review`}>리뷰 이벤트</Link>
               </li>
            </ul>
         </div>
      </div>
   )
}

export default Home
