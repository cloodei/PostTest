import '../assets/styles/ModalCard.css'

export default function ModalCard({ data }) {
    return (
    <>
        <div className="card bor-none w-100">
            <div className="row g-0 modal-card-contents">
                <div className="col-md-4">
                <img src={data.image1} className="img-fluid rounded" alt="..." style={{
                    width: '100%',
                    height: '220px'
                }}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">{data.title}</p>
                        <p className="card-text">
                            <small className="text-muted">Available in stock and ready for order</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}