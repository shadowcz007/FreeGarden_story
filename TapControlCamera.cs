using UnityEngine;
using System.Collections;

public class TapControlCamera : MonoBehaviour {
	[Tooltip("The prefab that gets spawned upon clicking")]
	public GameObject Prefab;

	[Tooltip("The amount of seconds it takes for the prefab to get automatically destroyed after being spawned")]
	public float AutoDestroyDelay = 2.0f;



	public Transform startMarker;
	public Transform endMarker;
	public float speed = 1.0F;
	public float Distance=12.0f;

	private float startTime;
	private float journeyLength;



	void Start() {
		
	}
	void Update() {
		float distCovered = (Time.time - startTime) * speed;
		float fracJourney = distCovered / journeyLength;
		transform.position = Vector3.Lerp(startMarker.position, endMarker.position, fracJourney);
	}



	protected virtual void OnEnable()
	{
		// Hook into the OnFingerTap event
		Lean.LeanTouch.OnFingerTap += OnFingerTap;
	}

	protected virtual void OnDisable()
	{
		// Unhook into the OnFingerTap event
		Lean.LeanTouch.OnFingerTap -= OnFingerTap;
	}

	public void OnFingerTap(Lean.LeanFinger finger)
	{
		// Does the prefab exist?
		if (Prefab != null)
		{
			// Make sure the finger isn't over any GUI elements
			if (finger.IsOverGui == false)
			{
				// Clone the prefab, and place it where the finger was tapped
				var position = finger.GetWorldPosition(Distance);
				var rotation = Quaternion.identity;
				var clone    = (GameObject)Instantiate(Prefab, position, rotation);

				endMarker = clone.transform;
				startTime = Time.time;
				journeyLength = Vector3.Distance(startMarker.position, endMarker.position);


				// Make sure the prefab gets destroyed after some time
				Destroy(clone, AutoDestroyDelay);


			}
		}
	}
}




