import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 20,
        category: 'general'

    }

    static propsType = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }

    constructor(props) {
        super(props);
        console.log("this is constructor from news component")
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `WhatsNews-${this.capitalizeFirstLetter(this.props.category)}`;

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updatenews() {
        this.props.setProgress(15);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.props.setProgress(30);
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.props.setProgress(50);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        console.log("this is componentdidmount");
        this.updatenews();
    }

    fetchMoreData = async () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }), async () => {
        this.props.setProgress(15);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.props.setProgress(30);
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.props.setProgress(50);
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    })
    }

    render() {
        console.log("render");
        return (
            <div className='container my-4'>
                <h2 className='newstitles'>{`Top Headlines ${this.capitalizeFirstLetter(this.props.category)}`}</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading && <Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-3" key={element.url}>
                                    <NewsItem 
                                    title={element.title} 
                                    description={element.description ? element.description : ""} 
                                    image={element.urlToImage} newsUrl={element.url}
                                    newsurl={element.url} 
                                    author={element.author} 
                                    publishedAt={element.publishedAt} 
                                    source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>


        )
    }
}

export default News