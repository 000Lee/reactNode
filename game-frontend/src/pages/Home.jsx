import { Link } from 'react-router-dom'

const Home = () => {
   return (
      <>
         <img className="girl1" src="/images/girl1.png" alt="girl" style={{ width: '415px', height: '415px' }} />

         <div className="middleNav">
            <ul>
               <li>소셜</li>
               <li>
                  <Link to={`/review`}>리뷰</Link>
               </li>
            </ul>
         </div>
      </>
   )
}

export default Home
