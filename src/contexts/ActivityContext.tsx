import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { storage } from "../utils/ionicStorage";
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
  handleUpdateActivitiesState: (activity_id: string) => void;
  handleFinishActivity: (activity_id: string) => void;
}

interface ActivityProviderProps{
  children: ReactNode;
}

export const ActivityContext = createContext({} as ActivityContextData)

export function ActivityProvider({children} : ActivityProviderProps){
  const [ activities, setActivities ] = useState<ActivitiesProps[]>([])
  const [ activitiesToday, setActivitiesToday ] = useState(0)
  const [ selectedActivity, setSelectedActivity ] = useState<ActivitiesProps>()
  const { user, updateUserState, handleFinishActivityInUser } = useUsers()

  useEffect(() => {
    if(!user?.hasAnswered){ return }
    (async () => {
      try{
        const { data } = await api.get('/activity/get-activities')
        await storage.set('activities', data)
        const user = await storage.get('user')
        user.activities_finished_today = 0
        await storage.set('user', user)
        updateUserState()

        setActivities(data)
      } catch(error: any) {
        if( error.response.data.error === 
            "You already request the activities, try again tomorrow") {
              const { data } = await api.get('/activity/my-list')
              await storage.set('activities', data)
              setActivities(data)
              return
        }
        alert(error.response.data.error)
      }
    })()
  },[user?.hasAnswered, updateUserState])

  function setActivitiesTodayState(num: number){ setActivitiesToday(num) }
  function setSelectedActivityState(activity: ActivitiesProps){ setSelectedActivity(activity) }
  function setActivitiesState(values : ActivitiesProps[]){ setActivities(values) }

  async function handleUpdateActivitiesState(activity_id: string) {
    const newArray: ActivitiesProps[] = []
    activities.forEach(item => item.id !== activity_id && newArray.push(item))
    setActivities(newArray)
    await storage.set('activities', newArray)
  }

  async function handleFinishActivity(activity_id: string){
    await api.delete(`/activity/finish/${activity_id}`)
    await handleUpdateActivitiesState(activity_id)
    handleFinishActivityInUser()
    // await handleUpdate({
    //   all_activities_finished: ((user?.all_activities_finished || 0) + 1),
    //   activities_finished_today: ((user?.activities_finished_today ||  0) + 1),
    // })
  }

  return (
    <ActivityContext.Provider
      value={{
        activities,
        setActivitiesState,
        activitiesToday,
        setActivitiesTodayState,
        selectedActivity,
        setSelectedActivityState,
        handleUpdateActivitiesState,
        handleFinishActivity
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity(){
  return useContext(ActivityContext)
}