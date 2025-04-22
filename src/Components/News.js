import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
  country: 'in',
    pageSize:8,
    category:'general',
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props);
    this.state ={
      articles:[],
      loading:false,
      page:1
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHive`;
  }

  async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a0547b144c14f7cbb742448fcf7bfb9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData =await data.json()
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,
      loading:false
    })
  }
  
  async componentDidMount(){
    this.updateNews();
  }

  handlePreviousClick= async()=>{
    this.setState({page: this.state.page -1});
    this.updateNews();
  }

 handleNextClick=async()=>{
    this.setState({page: this.state.page +1});
    this.updateNews();
  }
  
  render() {
    const{articles=[],loading}=this.state;
    return (
          <div className="container my-3">
            <h1 className="text-center" style={{margin:'40px 0px'}}>NewsHive - Trending Headlines on {this.capitalizeFirstLetter(this.props.category)}</h1>
           {this.state.loading && <Spinner/>}
            <div className="row">
            {!loading && articles.map((element)=>{
              return<div className="col-md-4" key={element.url}>
            <Newsitem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            })}        
        </div>  
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&#8592; Previous</button>
        <button disabled={this.state.page + 1>Math.ceil(this.state.totalResultstotalResults/this.props.pagesize)}type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &#8594;</button>
        </div> 
      </div>
    )
  }
}

export default News