import React from 'react';
import Navbar from './Navbar';
import Carousel from './Carousel';
import  Card1 from '../assets/Card1.png'
import  Card2 from '../assets/Card2.png'
import  Card3 from '../assets/Card3.png'

const Dashboard = () => {

  let slides = [
     Card1, Card2, Card3
  ];

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className='w-[80%] m-auto pt-7'>
        <Carousel slides={slides} />
      </div>

      <hr />

      <div className="flex flex-col h-[60vh] text-white">
        <div className="flex flex-row h-1/2">
          <div className="w-1/2 bg-blue-800">
            <h1 className='p-1'>Create</h1>
            <p className='p-3 '>Users can create Voting ballot online. And they can generate sharable link to the voters.</p>
          </div>
          <div className="w-1/2 bg-green-800">
          <h1 className='p-1'>Read</h1>
            <p className='p-3 '>Votes will be counted and displayed on the screen by fetchiing the details from the server.</p>
          </div>
        </div>
        <div className="flex flex-row h-1/2">
          <div className="w-1/2 bg-red-800">
          <h1 className='p-1'>Update</h1>
            <p className='p-3 '>Voters identity will be stored in our database, for future  refrences.</p>
          </div>
          <div className="w-1/2 bg-yellow-800">
          <h1 className='p-1'>Delete</h1>
            <p className='p-3 '>Once the voting ballot reaches limit, users can Delete the ballot from the same id from which it was created.</p>
          </div>
        </div>
      </div>

      <hr/>






      <div className="container mt-4 text-white bg-gray-700">
        <div className="row">
          <div className="col-md-6">
            <h2><i>Features</i></h2>
            <ul style={{
              listStyle: "disc"
            }}>
              <li>Create Live Voting form.</li>
              <li>Generate Link</li>
              <li>Share link</li>
              {/* Add more features as needed */}
            </ul>
          </div>
          {/* Add more columns if you want additional content beside the features */}
        </div>
      </div>
      <footer className="footer mt-4 mb-0 bg-black text-white">
        <div className="container">
          <p>&copy; 2023 Ethnus-Projects All Rights Reserved.</p>
        </div>
      </footer>
    </div>


  );
};

export default Dashboard;