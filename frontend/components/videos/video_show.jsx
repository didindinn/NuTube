import React from 'react';
import Header from '../header';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class VideoShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currLike: this.props.likes.id,
      currDislike: this.props.dislikes.id,
      numLikes: this.props.video.numLikes,
      numDislikes: this.props.video.numDislikes
    };

    this.videoEdit = this.videoEdit.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  handleLike(){  

    if (this.state.currLike) {
      this.props.deleteLike(this.props.video.id, this.state.currLike);
      this.setState({ 
        currLike: null, 
        numLikes: (this.state.numLikes - 1) 
      });
    } else if (this.state.currDislike) {
      this.props.deleteDislike(this.props.video.id, this.state.currDislike);
      this.props.createLike(this.props.video.id);
      this.setState({ 
        currDislike: null, 
        currLike: this.props.currentUser.id,
        numDislikes: (this.state.numDislikes - 1),
        numLikes: (this.state.numLikes + 1)
      });
    } else {
      this.props.createLike(this.props.video.id);
      this.setState({ 
        currLike: this.props.currentUser.id,
        numLikes: (this.state.numLikes + 1)
      });
    }
  }

  handleDislike(){
    if (this.state.currDislike) {
      this.props.deleteDislike(this.props.video.id, this.state.currDislike);
      this.setState({
        currDislike: null,
        numDislikes: (this.state.numDislikes - 1)
      });
    } else if (this.state.currLike) {
      this.props.deleteLike(this.props.video.id, this.state.currLike);
      this.props.createDislike(this.props.video.id);
      this.setState({
        currLike: null,
        currDislike: this.props.currentUser.id,
        numLikes: (this.state.numLikes - 1),
        numDislikes: (this.state.numDislikes +1)
      });
    } else {
      this.props.createDislike(this.props.video.id);
      this.setState({
        currDislike: this.props.currentUser.id,
        numDislikes: (this.state.numDislikes + 1)
      });
    }
  }

  videoEdit(){
    this.props.history.push(`/${this.props.videoId}/edit`);    
  }

  componentDidMount() {
    this.props.requestVideo(this.props.videoId);
  }
  
  render (){

    const video = this.props.video;
    if (video === undefined) {
      return null;
    }
    
    const editBtn = ((this.props.currentUser) && (this.props.currentUser.id === video.userId)) ? (
      <button className="show-video-edit" onClick={this.videoEdit}>Edit Video</button>
    ) : (
      <div></div>
    );

    return(
      <div className='show-video-page'>
        <Header />
        <div className='show-left-video'>
          <div className="show-top-spacer"></div>
          <div className='show-video'>
            <div className="show-left-spacer"></div>
              <div className="show-video-area">
                <video width="100%" height="auto" controls>
                  <source src={video.videoUrl} type="video/mp4"></source>
                </video>
                &nbsp;
                <h1>{video.title}</h1>
                &nbsp;
                <div className="likes">
                  <div className="temp-plays"></div>
                  <button className="like-btn" onClick={this.handleLike}>
                    <FontAwesomeIcon className="thumb" icon="thumbs-up" size="lg" color="rgb(150, 150, 150)" />
                    <h3>{this.state.numLikes}</h3>
                  </button>
                  &nbsp;
                  <button className="like-btn" onClick={this.handleDislike}>
                    <FontAwesomeIcon className="thumb" icon="thumbs-down" size="lg" color="rgb(150, 150, 150)" />
                    <h3>{this.state.numDislikes}</h3>
                  </button>
                </div>
                &nbsp;
                <div className="show-video-user-container">
                  <div className="show-video-user">
                    <div className="show-video-user-info">
                      <button className="show-video-user-btn">
                        {video.username[0].toUpperCase()}
                      </button>
                      <div className="show-video-user-spacer"></div>
                      <div className="show-video-user-info2">
                        <h3>{video.username}</h3>
                        <h4>Published on {video.createdAt}</h4>
                      </div>
                    </div>
                    {editBtn}
                  </div>
                  &nbsp;
                  <h3>{video.description}</h3>
                </div>
              </div>
          </div>
        </div>
      </div>
    );

  }
}

export default withRouter(VideoShow);