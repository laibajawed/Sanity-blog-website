import {PortableTextComponents} from "@portabletext/react";

// to make the heading bold
export const components: PortableTextComponents = {  
    block : {
        h4: ({children}) => <h4 className='text-3xl font-bold'>{children}</h4>,
        h3: ({children}) => <h3 className='text-3xl font-bold'>{children}</h3>
    },
    listItem:{
        bullet:({children})=><li className="list-disc">(children)</li>
    }

}