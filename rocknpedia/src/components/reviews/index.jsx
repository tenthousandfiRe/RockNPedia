import React, { Component } from 'react';
// import CKEditor from 'ckeditor4-react';



class Reviews extends Component {

    state = {
        review: ""
      };

  

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                <h2 style={{color: "white"}}>Review</h2>
                {/* <CKEditor
                    data="<p>Añade tu review</p>"
                    type="inline"
                    config={ {
                        toolbar: [ [ 'Bold', 'Italic', 'Cut', 'Copy', 'Paste' ] ]
                    } }
                    style={{color: "white"}}
                    onChange={e => console.log( e )}
                /> */}
                </div>
                </div>
            </div>
        );
    }
}

export default Reviews;

