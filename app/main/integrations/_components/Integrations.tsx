import IntegrationComponent from "./IntegrationComponent";
import logo1 from '@/public/Agent_Rio.png'
import logo2 from '@/public/Agent_Olivia.png'

const Integrations = () => {
    return (
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-evenly gap-[22px] mt-[52px]">
            <IntegrationComponent logo={logo1} nameOfIntegration="Eagleowl" />
            <IntegrationComponent logo={logo1} nameOfIntegration="Netsuite" />
            <IntegrationComponent logo={logo1} nameOfIntegration="Brightpearl" />
            <IntegrationComponent logo={logo2} nameOfIntegration="eposnow" />
            <IntegrationComponent logo={logo2} nameOfIntegration="Drive" />
        </div>
    );
}
 
export default Integrations;