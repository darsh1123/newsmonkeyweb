import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';
import PropTypes from 'prop-types';
import './components.css';


export class News extends Component {


  // proptypes use kar rahe hain hum 

  static defaultProps = {
    country:'in',
    PageSize: 6,
    category:'general'

  }
  static propTypes={
    country: PropTypes.string,
    PageSize: PropTypes.number,
    category: PropTypes.string

  }
  articles = [
    // {
    //     "source": {
    //         "id": "bbc-sport",
    //         "name": "BBC Sport"
    //     },
    //     "author": null,
    //     "title": "Stuart MacGill: Australian cricket star charged over drug supply plot",
    //     "description": "Two years after his alleged kidnapping made global headlines, Stuart MacGill has been arrested.",
    //     "url": "http://www.bbc.co.uk/news/world-australia-66816892",
    //     "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/5B3F/production/_131095332_gettyimages-876912792.jpg",
    //     "publishedAt": "2023-09-15T06:37:18.9101658Z",
    //     "content": "Former Australian star cricketer Stuart MacGill has been charged over his alleged role in a large cocaine supply plot.\r\nPolice arrested the 52-year-old, who played 44 Test matches for Australia, in S… [+1318 chars]"
    // },
    // {
    //     "source": {
    //         "id": "espn-cric-info",
    //         "name": "ESPN Cric Info"
    //     },
    //     "author": null,
    //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //     "publishedAt": "2020-04-27T11:41:47Z",
    //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    // },
    // {
    //     "source": {
    //         "id": "espn-cric-info",
    //         "name": "ESPN Cric Info"
    //     },
    //     "author": null,
    //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //     "publishedAt": "2020-03-30T15:26:05Z",
    //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    // }
    // maine comment out islia kardia kyunki main neeche api use kar raha hoon
]

CapitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props){
    super(props);
    this.state={
      articles : this.articles,
      loading:false,
      Page:1
      // ismein hamne dekha ki this.state ki madat se kaise hum constructor ke andar state  ko set kar sakte haian
      // hum state jb use karte hain jb hum usko baar baar change kare aur chahe ki woh variable baar baar change ho bn apage reload kare
      
    }
    document.title = `${this.CapitalizeFirstLetter(this.props.category)} - NewsMonkey`; 
    // ab hum capital mei karenge
  }

// Ab mein ek funtion lih raha hoon taaki mein usko use karoon wohi same function mujh ebaar bara use na karna pade
  async componentDidMount(){
    // jb mein data first time fetch karu tabh bhi men progress ko 0 kar doon
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&PageSize=${this.props.PageSize}`;
    // ab mein fetch api ka use karunga
    this.setState({loading:true});
    let data= await fetch(url);
    this.props.setProgress(50);
    let parseddata = await data.json();
    this.props.setProgress(70);
    console.log(parseddata);
    this.setState({articles : parseddata.articles , totalResults: parseddata.totalResults, loading:false})
    // yeh apne aap mein ek promise hogi mtlb jo data aaya hain mein usko text mein convert kara chahta hoon ya json mein pass karna chahta hoon toh woh mein kar sakta hoon
    this.props.setProgress(100);
    // progress ham 0 se 100 kar sakte hain
  }
    
  // hum ek componentdidmount() method use karege yeh ek lifecycle method hain yeh render ke baad run kareg amtlb jabh saari cheeze run hojayenge render waali tabh yeh run karega
  // sabe pehle constructor run hota hain phir render aur uske baad componentdidmount hota hain
  // constuctor jabhi run karta hain tabh us class ka koi object banta hain


  handleprevclick = async()=>{
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&Page=${this.state.Page - 1}&PageSize=${this.props.PageSize}`;
    // ab mein fetch api ka use karunga
    this.setState({loading:true});
    let data= await fetch(url);
    this.props.setProgress(50);
    let parseddata = await data.json();
    this.props.setProgress(70);
    this.setState({
      Page:this.state.Page - 1,
      articles : parseddata.articles,
      loading:false
    })
    this.props.setProgress(100);
  }
  
  handlenextclick = async ()=>{
    if(!(this.state.Page+1> Math.ceil(this.props.PageSize))){
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&Page=${this.state.Page + 1}&PageSize=${this.props.PageSize}`;
    // ab mein fetch api ka use karunga
    // Hum ek baat dekhenge maine api ke last mein ek cheez add kari hain page size iska mtlb ek page pe kitne articles homge
    this.setState({loading:true});
    // uppar loading likha hain iska mtlb jabhi bhi api pe hit karega toh loading ko start rakh dega
    let data= await fetch(url);
    this.props.setProgress(50);
    let parseddata = await data.json();
    this.props.setProgress(70);
    this.setState({
      Page:this.state.Page + 1,
      articles : parseddata.articles,
      loading:false
    })
    this.props.setProgress(100);
    }
    
    // Math.ceil ek function hain jaise 4.6 ka 5 hoga toh yeh total pages honge    

  }

  render() {
    return (
      <div className='container my-4'>
        <h1 className="text-center text-light" style={{margin: '80px 0px'}}>
          {/* // hamne uppar style mein pehla curly bracket lagaya hain kyunki java script tha phir doosra  lagaya kyunki usmein bhi object tha */}
        News-Monkey Top {this.CapitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
            {/* // hame kya hain ki agar null data mila element mein ya description mein toh error aa jayega isko solve karne ke lia hum conditional statement ka use karenge */}
          <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl= {element.urlToImage} newsUrl ={element.url} author= {element.author} date={element.publishedAt} source={element.source.name}/>
          {/* // yeh uppar hamne slice islia likha hain agar kisis ka title bada bhi ho  toh sabh uniform jaisa lage */}
        {/* yeh uppar maine inhe api se liya hian aur inhe mein news comonent mein pahucha raha hoon  */}
          </div>
        })}
          
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.Page<=1} type="button" className="btn btn-light" onClick={this.handleprevclick}>&larr;Previous</button>
        <button disabled={this.state.Page+1> Math.ceil(this.props.PageSize)}type="button" className="btn btn-light" onClick={this.handlenextclick}>Next &rarr;</button>
        {/* // hamne yeh button use kare hain taaki hum apne page ko side kar sake aur jo yeh atpata sa likha hain previous ke aage aur next ke peeche yeh arrows symbol hote hain unka code hain */}
        {/* Ab humne uppar button waale code mein disabled ka use kara hain mtlb agar mera page 1 yaah 1 se kam hain toh previous ka hona banta nhi hain  */}
        </div>
      </div>
    )
  }
}

export default News
