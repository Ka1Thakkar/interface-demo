import AgentCompnent from "./AgentComponent";
import Olivia from '@/public/Agent_Olivia.png'
import Astrid from '@/public/Agent_Astrid.png'
import Rio from '@/public/Agent_Rio.png'

const Agents = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-5">
            <AgentCompnent agentTitle="The data enty agent" agentName="Olivia" agentImage={Olivia} agentRoute="" />
            <AgentCompnent agentTitle="The data scientist agent" agentName="Astrid" agentImage={Astrid} agentRoute="" />
            <AgentCompnent agentTitle="Procurement Analyst" agentName="Rio" agentImage={Rio} agentRoute="" />
        </div>
    );
}
 
export default Agents;