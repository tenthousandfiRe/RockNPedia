import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import { myFetch } from '../../../src/utils'


class Reviews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            review: ""
          };
    }

      onReviewChange(e) {
        this.setState({
          review: e.editor.getData()
        });
        console.log(this.state.review);
      }

      submitReview(review){
        myFetch({ 
        method: "POST", 
        path: `/reviews/`, 
        json:  review
        }).then(json => {
            console.log(json)
          })
        // this.props.history.push(`/`)
      }
  

    render() {
        const { review } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                <h2 style={{color: "white"}}>Album review</h2>
                <CKEditor
                    type="inline"
                    config={ {
                        toolbar: [ [ 'Bold', 'Italic', 'Cut', 'Copy', 'Paste' ] ]
                    } }
                    style={{color: "white"}}
                    data={review}
                    onChange={e => this.onReviewChange(e)}
                />
                
                </div>
                <button
                    className="btn btn-outline-dark mt-3 boton"
                    onClick={() => this.submitReview(review)}
                  >
                    Enviar
                  </button>
                </div>
            </div>
        );
    }
}

export default Reviews;

