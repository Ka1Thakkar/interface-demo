import IntegrationComponent from "./IntegrationComponent";
import Eagleowl from '@/public/Integrations/Eagleowl.png'
import eposnow from '@/public/Integrations/eposnow.png'
import Drive from '@/public/Integrations/Drive.png'
import Brightpearl from '@/public/Integrations/Brightpearl.png'
import Netsuite from '@/public/Integrations/Netsuite.png'

const Integrations = () => {
    return (
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-evenly gap-[22px] mt-[52px]">
            <IntegrationComponent logo={Eagleowl} nameOfIntegration="Eagleowl" />
            <IntegrationComponent logo={Netsuite} nameOfIntegration="Netsuite" />
            <IntegrationComponent logo={Brightpearl} nameOfIntegration="Brightpearl" />
            <IntegrationComponent logo={eposnow} nameOfIntegration="eposnow" />
            <IntegrationComponent logo={Drive} nameOfIntegration="Drive" />
        </div>
    );
}
 
export default Integrations;