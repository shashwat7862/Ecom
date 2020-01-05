import React from 'react';

class hrNavBar extends React.Component{
    constructor(){
        super()
        this.state ={
            addClass: false
            // rightClass: false
        }
    }
    arrowLeftHandler = ()=>{
        // this.setState({addClass: !this.state.addClass})
    }
    arrowRightHandler = () => {
        // var leftArrow = document.getElementsByClassName('navBar-arrow-left');
        // leftArrow.
        // event.target.classList.add()
        // let box = ["navBar-arrow-left"];
        // box.push('hidden');
        this.setState({addClass: !this.state.addClass})
    }
    render(){
        let box = ["navBar-arrow-left"];
        if(this.state.addClass){
            box.push('hidden')
        }
        return(
            <div className="col-md-12">
                <div className="hrNavBar">
               
                    <ul>
                   <li className="navBar-arrow-left" onClick={this.arrowLeftHandler}><i className="fa fa-angle-double-left" aria-hidden="true"></i></li>
                        <li><a href="#">Electronics <i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
                        <li><a href="#">Men <i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
                        <li><a href="#">Women <i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
                        <li><a href="#">TV & Appliances <i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
                        <li><a href="#">Baby & Kids <i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
                        <li><a href="#">Home& Furniutre <i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
                        <li><a href="#">Sports, Books & More <i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
                        <li><a href="#">Offer Zone <i class="fa fa-caret-down" aria-hidden="true"></i></a></li>
                        <li className={box.join(" ")} onClick={this.arrowRightHandler}><i className="fa fa-angle-double-right" aria-hidden="true"></i></li>
                    </ul>
                </div>
            </div>

//             <div class="container">
//     <div class="d-flex align-items-center">

//         <div class="flex-shrink-0 border rounded">
//             <a  class="btn-left btn-link p-2 toggleLeft"><i class="ion-chevron-left"></i></a>
//         </div>
//         <div class="flex-grow-1 position-relative overflow-hidden" id="outer">
//             <ul class="nav nav-fill text-uppercase position-relative flex-nowrap" id="bar">
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Home</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Self</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">World</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Lifestyle</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Bio</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Politics</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Local</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Science</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Tech</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Health</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Food</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Design</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Culture</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">Travel</a>
//                 </li>
//                 <li class="nav-item">
//                     <a href="#" class="nav-link">More</a>
//                 </li>
//             </ul>
//         </div>
//         <div class="flex-shrink-0 border rounded">
//             <a href="#" class="btn-right btn-link toggleRight p-2"><i class="ion-chevron-right"></i></a>
//         </div>
//     </div>
// </div>
        )
    }
}
export default hrNavBar;