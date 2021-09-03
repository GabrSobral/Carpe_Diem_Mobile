import { useEffect } from "react";
import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import { useUsers } from "./UserContext";

interface ICategory{
  id: string;
  name: string;
}

export interface ActivitiesProps{
  id : string;
  title : string;
  body: string;
  description: string;
  files: any[]
  category : ICategory
}

interface ActivityContextData{
  activities: ActivitiesProps[];
  setActivitiesState: (values:  ActivitiesProps[]) => void;
  activitiesToday: number;
  setActivitiesTodayState: (num: number)=> void;
  selectedActivity?: ActivitiesProps;
  setSelectedActivityState: (activity: ActivitiesProps) => void;
}

interface ActivityProviderProps{
  children: ReactNode;
}


export const ActivityContext = createContext({} as ActivityContextData)

export function ActivityProvider({children} : ActivityProviderProps){
  const [ activities, setActivities ] = useState<ActivitiesProps[]>([])
  const [ activitiesToday, setActivitiesToday ] = useState(0)
  const [ selectedActivity, setSelectedActivity ] = useState<ActivitiesProps>()
  const { isAuthenticated } = useUsers()

  useEffect(() => {
    if(!isAuthenticated){ return }
    (async () => {
      try{
        const { data } = await api.get('/activity/get-activities')
        console.log(data)
        setActivities(data)
      } catch(error: any) {
        if( error.response.data.error === 
            "You already request the activities, try again tomorrow") {
              const { data } = await api.get('/activity/my-list')
              setActivities(data)
              return
            }
        alert(error.response.data.error)
      }
    })()
  },[isAuthenticated])

  function setActivitiesTodayState(num: number){ setActivitiesToday(num) }
  function setSelectedActivityState(activity: ActivitiesProps){ setSelectedActivity(activity) }

  function setActivitiesState(values : ActivitiesProps[]){
    setActivities(values)
  }

  return (
    <ActivityContext.Provider
      value={{
        activities,
        setActivitiesState,
        activitiesToday,
        setActivitiesTodayState,
        selectedActivity,
        setSelectedActivityState
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity(){
  return useContext(ActivityContext)
}