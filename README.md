# Error-404-Not-Found

### Ideas for various stages of Disaster: 


**Prediction of disaster** - Hurricanes, floods and droughts are, to some extent predictable. One can use weather data from the past and detect anomalies in it to predict an oncoming disaster. This would require the use of temperature, precipitation and humidity data over the years which can be found in Meteorology dept archives. Following this, we would need to build a **Machine Learning model using Autoencoders (and/or RNNs) which detects anomalies in the weather readings and issues warning for oncoming disasters. It would also be a good idea to try and use a convolutional network type approach where we use data from various nearby regions to predict the state of the central region.** Because most of these disasters build up over time from surrounding places (E.g. the 2004 Tsunami originated near Indonesia, not the Indian subcontinent). We would also need to top it up with earthquake and tsunami alerts. These are usually non-predictable disasters and one leads to the other. Additionally, floods also have a man-made component to them which needs to be taken care of. 

 
**Prevention of disasters** - Coming to the man-made aspects of the disasters, floods and droughts are preventable if resources are managed well. E.g. the Mumbai floods were mainly a result of water logging due to plastic waste. So, for these we would basically need information about the **amount of water in dams, the maintenance info** and so on. Additionally, we also need to know the **state of the sewers in the city**. For droughts, **keeping track of the water resources in the city and predicting rain should be good enough.** We can also prevent Fire Disasters by installing **smoke detectors in fire prone zones, Wet pipe sprinkler.** Naturally caused Forest Fires are mostly because of lightning. From Weather Data and Lightning-Prediction Systems we can identify **lightning prone locations**. It is much easier to extinguish a fire in a preidentified region. 

 
**Impact management** - Creating a handbook that details what one can do in times of a disaster, A **Risk Map** which shows safer locations, an alert system that functions even when the normal network is down using **Common Alerting Protocol (CAP)** and a notification system that informs the relevant bodies about the disaster struck areas in order to send relief. A location which has lower probability of getting struck by the disaster can be assumed to be a safer location, more precisely the location which is **local minima in terms of probability of getting struck is the nearest safest place in the affected region**. 
