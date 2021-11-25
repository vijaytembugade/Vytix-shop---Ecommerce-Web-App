import {Helmet} from 'react-helmet'
const Meta = ({title,description,keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" keyword={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title : 'Welcome to Vytix',
    description : "We sell product which can fit in your pocket.",
    keywords: "electronics, phone, laptops"
}

export default Meta

