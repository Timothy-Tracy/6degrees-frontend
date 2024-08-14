import React, { useRef, useState, useCallback, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { CloseButton, Col, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from 'reactstrap';
import TimeAgo from '../../tools/TimeAgo';


const GraphVisualizer = ({ data, width, height }) => {

    const [toggle, setToggle] = useState(false)
    const [selectedNode, setSelectedNode] = useState(null)
    const [dimensions, setDimensions] = useState({ width: width ||800, height: height|| 250 });
    const containerRef = useRef(null);
    const handleToggle = () => setToggle(!toggle);
    useEffect(() => {
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: height
            });
        }
    }, [height]);


    const handleNodeClick = (node) => {
        console.log('Clicked node:', node);
        // Extract and use the node data here
        setSelectedNode(node)
        const { id, name, someProperty } = node;
        // Do something with the extracted data
        handleToggle()
    };
    if (!data) {
        return (<div>nodata</div>)
    }

    const nodeUsernameCanvasObject = (node, ctx, globalScale) => {
        const label = node.username || 'Anonymous User';
        const fontSize = 12 / globalScale;
        const nodeFontSize = 8 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = node.color || 'black';

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();

       

        // Draw label
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`@${label}`, node.x, node.y + 10);

         // Draw degree
         ctx.font = `${8}px Sans-Serif`;
         ctx.textAlign = 'center';
         ctx.textBaseline = 'middle';
         ctx.fillStyle = 'white';
         ctx.fillText(node.degree, node.x, node.y);
    };

    return (
        
        <div className='container-fluid' ref={containerRef} style={{ width: '100%', height: '100%' }}>
        <ForceGraph2D
            graphData={data}
            nodeLabel='username'
            nodeAutoColorBy="degree"
            nodeCanvasObject={nodeUsernameCanvasObject}
            nodeCanvasObjectMode={() => 'replace'}
            nodeRelSize={10}
            onNodeClick={handleNodeClick}
            linkWidth={1}
            linkColor={() => 'white'}
            linkLabel="EDGE_QUERY"
            linkDirectionalArrowLength={2}
            linkDirectionalArrowRelPos={1}
            linkDirectionalArrowColor={() => 'white'}
            linkDirectionalParticleColor={() => 'blue'}
            linkCurvature={0}
            width={dimensions.width || null}
            height={dimensions.height}
        />
        <Offcanvas
            backdrop={true}
            direction="end"
            isOpen={toggle}
        >
            <CloseButton onClick={() => { setSelectedNode(null); handleToggle(); }} className='justify-content-end' variant='white' />
            <OffcanvasHeader toggle={handleToggle}>
                User @{selectedNode?.username || 'Anonymous User'} interacted with this post <TimeAgo dateString={selectedNode?.createdAt} />
            </OffcanvasHeader>
            <OffcanvasBody>
                <p>Degree of separation: {selectedNode?.degree}</p>
                <strong>Thanks to @{selectedNode?.username || 'Anonymous User'},</strong>
                <p>{selectedNode?.views?.low} people have seen this post</p>
                <p>{selectedNode?.shares?.low} people have interacted with this post</p>
            </OffcanvasBody>
        </Offcanvas>
    </div>


        


    );
};

export default GraphVisualizer