/*==============================================================================
Copyright (c) 2010-2014 Qualcomm Connected Experiences, Inc.
All Rights Reserved.
Confidential and Proprietary - Protected under copyright and other laws.
==============================================================================*/

using UnityEngine;
using System.Collections;

namespace Vuforia
{
    /// <summary>
    /// A custom handler that implements the ITrackableEventHandler interface.
    /// </summary>
    public class DefaultTrackableEventHandler : MonoBehaviour,
                                                ITrackableEventHandler
    {
        #region PRIVATE_MEMBER_VARIABLES
 
        private TrackableBehaviour mTrackableBehaviour;
        //public Transform objectTransform;
		public GameObject foundGameObject;
		public string FoundName ;

		public Transform foundParent;
        #endregion // PRIVATE_MEMBER_VARIABLES



        #region UNTIY_MONOBEHAVIOUR_METHODS
    
        void Start()
        {
            mTrackableBehaviour = GetComponent<TrackableBehaviour>();
            if (mTrackableBehaviour)
            {
                mTrackableBehaviour.RegisterTrackableEventHandler(this);
            }
        }

        #endregion // UNTIY_MONOBEHAVIOUR_METHODS



        #region PUBLIC_METHODS

        /// <summary>
        /// Implementation of the ITrackableEventHandler function called when the
        /// tracking state changes.
        /// </summary>
        public void OnTrackableStateChanged(TrackableBehaviour.Status previousStatus,
                                        TrackableBehaviour.Status newStatus) {
            if (newStatus == TrackableBehaviour.Status.DETECTED ||
                newStatus == TrackableBehaviour.Status.TRACKED ||
                newStatus == TrackableBehaviour.Status.EXTENDED_TRACKED){
                OnTrackingFound();
               // StopAllCoroutines();//关闭所有协同程序
               // StartCoroutine(MoveUp());//开启特定的协同程序
            }
            else{
				StartCoroutine(WaitTimeOnTrackingLost());

            }
        }

        #endregion // PUBLIC_METHODS

		IEnumerator WaitTimeOnTrackingLost() {
			print(Time.time);
			yield return new WaitForSeconds(5);
			print(Time.time);

			Renderer[] rendererComponents = GetComponentsInChildren<Renderer>(true);
			Collider[] colliderComponents = GetComponentsInChildren<Collider>(true);

			// Disable rendering:
			foreach (Renderer component in rendererComponents)
			{
				component.enabled = false;
			}

			// Disable colliders:
			foreach (Collider component in colliderComponents)
			{
				component.enabled = false;
			}

			Debug.Log("Trackable " + mTrackableBehaviour.TrackableName + " lost");



			foundGameObject.transform.SetParent(foundParent);
			foundGameObject.SetActive (false);

		}

        //sphere上升控制
		/*
        IEnumerator MoveUp() 
        {
            objectTransform.transform.localPosition = new Vector3(0,-2,0);
            while(objectTransform.transform.localPosition!=Vector3.zero)
            {
                yield return new WaitForEndOfFrame();
                objectTransform.transform.localPosition = Vector3.MoveTowards(objectTransform.transform.localPosition,Vector3.zero,1f*Time.deltaTime);
            }
        }

*/

     


        private void OnTrackingFound()
        {
            Renderer[] rendererComponents = GetComponentsInChildren<Renderer>(true);
            Collider[] colliderComponents = GetComponentsInChildren<Collider>(true);
            

            // Enable rendering:
            foreach (Renderer component in rendererComponents)
            {
                component.enabled = true;
            }

            // Enable colliders:
            foreach (Collider component in colliderComponents)
            {
                component.enabled = true;
            }

            Debug.Log("Trackable " + mTrackableBehaviour.TrackableName + " found");


			FoundName = mTrackableBehaviour.TrackableName;
			foundGameObject = transform.Find (FoundName).gameObject;
			foundParent = foundGameObject.transform.parent;
			Debug.Log (foundGameObject.transform.parent);
			Transform newParent;
			newParent = GameObject.Find ("FoundGameObject").transform;
			foundGameObject.transform.SetParent(newParent);
			foundGameObject.SetActive (true);
        }	

      

      
    }
}
