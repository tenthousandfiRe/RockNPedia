import React from 'react'

interface IProps {}

interface IGlobalActionProps {}

interface IState {
    name: string;
    foundation_year: number;
    band_image: string;
    history: string;
}


class InsertBand extends React.PureComponent<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: "",
            foundation_year: 0,
            band_image: "",
            history: ""
        }

        this.onNameChange = this.onNameChange.bind(this)
        this.onFoundationYearChange = this.onFoundationYearChange.bind(this)
    }

    onNameChange(event: any){
        const name = event.target.value;
        this.setState({name})
    }

    onFoundationYearChange(event: any){
        const foundation_year = event.target.value;
        this.setState({foundation_year})
    }

    onBandImageChange(event: any){
        const band_image = event.target.value;
        this.setState({band_image})
    }


    render() {
        const { name, foundation_year, band_image, history } = this.state
        return(
            <div className="">
            <div className="card-content">
              <div className="form">
                <label className="label"><strong>Nombre de la banda</strong></label>
                <div className="control">
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={this.onNameChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label"><strong>Año de fundación</strong></label>
                <div className="control">
                  <input
                    className="form-control"
                    type="text"
                    value={foundation_year}
                    placeholder={`${foundation_year}`}
                    onChange={this.onFoundationYearChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="label"><strong>Imagen</strong></label>
                <div className="control">
                  <input
                    className="form-control"
                    type="text"
                    value={band_image}
                    onChange={this.onBandImageChange}
                  />
                </div>
              </div>
               
              </div>
            </div>
        )
    }
}

export default(InsertBand)