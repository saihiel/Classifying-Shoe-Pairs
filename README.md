# Classifying Pairs of Shoes for the Visually Impaired
Have you ever looked at two shoes and wondered whether they come from the same pair or not? Me neither. But unfortunately, not everyone has this privledge. People with visual impairments face similar challenges daily. In this project I designed and developed a model that can function as the underlying model for a system that deals with this issue.  
This end-to-end project deals with preprocessing the image data, creating models with two different convolutional architectures, training the neural networks (including tuning hyperparameters) and evaluating the models. 
* Cleaned and preprocessed image data using numpy and created visualizations using matplotlib
* Built two *convolutional neural networks* using pytorch, each with different architectures
* Tuned the hyperparameters for each model varying learning rate, dropout, weight decay, learning rate decay, batch size and the number of feature maps to find the optimal combination of capacity, speed, and generalization for my models.  

Since the characteristics of mens and womens shoes are different, I evaluated my model's performance seperately on mens shoes and womens shoes.   

[TRY IT NOW!](https://shoes-classifier-api.herokuapp.com/)

Learning Curve for Model 1 |  Learning Curve for Model 2
:-------------------------:|:-------------------------:
![](https://github.com/saihiel/Data-Portfolio/blob/master/images/Project2/model%201%20learning%20curve.png)  |  ![](https://github.com/saihiel/Data-Portfolio/blob/master/images/Project2/model%202%20learning%20curve.png)

## Results  
Model 2 acheived a higher validation accuracy and was hence selected to be evaluated on the test set. The model achieved  an accuracy of **85%** on womens shoes and **76%** on mens shoes. I suspect this difference is due to more defining characteristics commonly present on womens shoes.  

Example of mens shoes classified correctly |  Example of womens shoes classified incorrectly
:-------------------------:|:-------------------------:
![](https://github.com/saihiel/Data-Portfolio/blob/master/images/Project2/mens_correct.png)  |  ![](https://github.com/saihiel/Data-Portfolio/blob/master/images/Project2/womens_wrong.png)
