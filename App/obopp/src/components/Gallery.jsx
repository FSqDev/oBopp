// how to display image?

export default function Gallery() {
    let picture = require('App/obopp/src/image/lion_cat.jpg');
    return (
        <img src={picture}/>
    );
}