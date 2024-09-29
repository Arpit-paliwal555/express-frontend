import LibraryBookIcon from '../assets/library-book-svgrepo-com.svg';
export default function Navbar(){


    return(
        <div>
    <div className="flex flex-wrap mb-1">
        <section className="relative  mx-auto">
            
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                <a className="text-3xl size-8 " href="#">
                <img src={LibraryBookIcon} alt="Library Book Icon" className="h-8 w-8 mr-2" />
                </a>
                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-8">
                    <li><a className="hover:text-gray-200 hover:cursor-pointer" href="/home">Home</a></li>
                    <li><a className="hover:text-gray-200" href="/search">Search Book</a></li>
                    <li><a className="hover:text-gray-200" href="/returnBook">Return Book</a></li>
                    <li><a className="hover:text-gray-200" href="/transactions">See Transaction Details</a></li>
                </ul>
                <div className="hidden xl:flex space-x-4 items-center">
                    <a className="hover:text-gray-200">
                    </a>
                    <a className="flex items-center hover:text-gray-200" href="/user">
                        Users
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 ml-3 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
        </section>
        </div>
  </div>
  

    )
}