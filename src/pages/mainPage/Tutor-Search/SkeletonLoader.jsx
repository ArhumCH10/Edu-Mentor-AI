import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = () => {
    return (
        <>
            {[1, 2, 3].map((index) => (
                <div key={index} className="row" style={{ marginLeft: '5px' }}>
                    <div className="col-8 ">
                        <div className="row" style={{
                            marginLeft: '10px',
                            border: '2px solid #ccc',
                            padding: '20px',
                            borderRadius: '5px',
                            marginBottom: '10px',
                        }}>
                            <div className="col-2">
                                <Skeleton height={150} width={120} style={{ margin: 'auto', borderRadius: '10% 1%' }} />

                            </div>
                            <div className="col-6 mx-4">
                                <Skeleton height={20} width={100} style={{ marginBottom: '10px' }} />
                                <Skeleton height={20} width={100} style={{ marginBottom: '10px' }} />
                                <Skeleton height={20} width={100} style={{ marginBottom: '10px' }} />
                                <Skeleton height={20} width={100} style={{ marginBottom: '10px' }} />
                                <Skeleton height={80} width={'100%'} style={{ marginBottom: '10px' }} />
                            </div>
                            <div className="col-3" >
                                <div style={{ marginLeft: '5rem' }}>
                                <Skeleton height={20} width={100} style={{ marginBottom: '10px' }} />
                                <Skeleton height={20} width={100} style={{ marginBottom: '10px' }} />

                                </div>
                               <div style={{marginLeft:'10px'}}>

                                <Skeleton height={40} width={'115%'} style={{  border: '2px solid #ccc', marginTop: '4rem',  borderRadius: '10px' }} />
                                <Skeleton height={40} width={'115%'} style={{  border: '2px solid #ccc', marginTop: '10px',  borderRadius: '10px' }} />
                               
                               </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 " >
                        <Skeleton height={230} width={350} style={{ border: '2px solid #ccc', borderRadius: '5px', padding: 0 }} />
                        <Skeleton height={40} width={350} style={{ marginBottom: '10px' }} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default SkeletonLoader;
