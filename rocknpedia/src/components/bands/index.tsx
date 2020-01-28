import React from 'react';
import './style.css'
import { connect } from "react-redux";
import { myFetch } from "../../utils";
import { SetBandsAction } from '../../redux/actions'
import { IBand } from '../../interfaces/IBand'
import { IStore } from '../../interfaces/IStore'


interface IGlobalStateProps {
    band: IBand
    bands: IBand[];
    setBands(bands: IBand[]): void,
}

interface IGlobalActionProps { }

type TProps = IGlobalStateProps & IGlobalActionProps;

class Bands extends React.PureComponent<TProps> {
    constructor(props: TProps) {
        super(props)

    }

    getBands() {
        myFetch({ path: "/bands/" }).then(json => {
            this.props.setBands(json)
        })


    }

    componentWillMount() {
        this.getBands()
    }

    render() {
        const { bands } = this.props
        return (
            <div className="container-fluid">
                {bands.map(({ name, foundation_year, band_image }) => (
                     <div className="card mb-3" style={{ width: 900 }}>
                     <div className="row no-gutters">
                         <div className="col-md-4">
                             <img style={{ width: 100 }} src="http://www.publicidadeuskadi.com/img/2013/03/rollingstonestonguelogo.jpg" className="card-img" alt="..."></img>
                         </div>
                         <div className="col-md-8">
                             <div className="card-body">
                                 <h5 className="card-title">{name}</h5>
                                 <p className="card-text">{foundation_year}</p>
                                 <p className="card-text"><small className="text-muted">{band_image}</small></p>
                                 <a href="#" className="btn btn-primary">Ver historia</a>
                             </div>
                         </div>
                     </div>
                 </div>
                ))}
            </ div>
        )
    }
}

const mapStateToProps = ({ bands }: IStore) => ({ bands });

const mapDispatchToProps = {
    setBands: SetBandsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Bands);