
// https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0039504#pone.0039504.s001
const inputText = `
   2     320   0.07778  0.00312  0.07890  0.00384     336   0.07922  0.00319  0.08031  0.00363 
   3     285   0.07931  0.00283  0.07915  0.00384     237   0.08000  0.00303  0.08016  0.00366 
   4     257   0.07932  0.00300  0.07937  0.00383     280   0.08045  0.00280  0.08001  0.00369 
   5     240   0.08009  0.00335  0.07955  0.00383     265   0.08085  0.00327  0.07985  0.00372 
   6     249   0.07989  0.00362  0.07964  0.00382     254   0.08006  0.00338  0.07969  0.00375 
   7     266   0.07968  0.00341  0.07966  0.00382     269   0.08013  0.00333  0.07952  0.00378 
   8     278   0.08063  0.00415  0.07958  0.00382     272   0.08039  0.00388  0.07935  0.00380 
   9     261   0.08025  0.00423  0.07942  0.00381     259   0.08016  0.00370  0.07917  0.00383 
  10     263   0.07969  0.00408  0.07917  0.00381     247   0.07914  0.00378  0.07899  0.00386 
  11     250   0.07964  0.00442  0.07886  0.00381     285   0.07934  0.00400  0.07881  0.00389 
  12     439   0.07953  0.00438  0.07849  0.00380     443   0.07825  0.00403  0.07863  0.00392 
  13     439   0.07807  0.00434  0.07810  0.00380     462   0.07807  0.00439  0.07846  0.00395 
  14     408   0.07712  0.00436  0.07772  0.00380     468   0.07762  0.00441  0.07829  0.00397 
  15     416   0.07647  0.00415  0.07739  0.00379     377   0.07701  0.00391  0.07814  0.00400 
  16     461   0.07583  0.00379  0.07716  0.00379     379   0.07739  0.00399  0.07799  0.00403 
  17     461   0.07625  0.00376  0.07703  0.00378     391   0.07714  0.00394  0.07787  0.00406 
  18     406   0.07665  0.00361  0.07702  0.00378     377   0.07705  0.00413  0.07775  0.00408 
  19     394   0.07665  0.00393  0.07711  0.00378     332   0.07743  0.00419  0.07765  0.00411 
  20     120   0.07715  0.00410  0.07728  0.00377     118   0.07712  0.00465  0.07757  0.00414 
  21     129   0.07754  0.00370  0.07750  0.00377     105   0.07786  0.00415  0.07750  0.00416 
  22     118   0.07861  0.00452  0.07777  0.00377     100   0.07728  0.00430  0.07744  0.00419 
  23     105   0.07839  0.00364  0.07804  0.00376     100   0.07726  0.00463  0.07740  0.00422 
  24      95   0.07794  0.00363  0.07831  0.00376     108   0.07771  0.00490  0.07737  0.00424 
  25     107   0.07880  0.00354  0.07858  0.00376      90   0.07699  0.00407  0.07735  0.00427 
  26     121   0.07895  0.00381  0.07882  0.00375      85   0.07719  0.00543  0.07734  0.00429 
  27      94   0.07936  0.00402  0.07904  0.00375      75   0.07756  0.00450  0.07735  0.00432 
  28     106   0.07999  0.00387  0.07922  0.00374      95   0.07772  0.00468  0.07736  0.00435 
  29     102   0.07944  0.00381  0.07938  0.00374      99   0.07744  0.00402  0.07739  0.00437 
  30      98   0.07949  0.00370  0.07951  0.00374     105   0.07703  0.00421  0.07743  0.00440 
  31     100   0.07890  0.00317  0.07963  0.00373      96   0.07714  0.00478  0.07747  0.00442 
  32     114   0.07922  0.00374  0.07975  0.00373     101   0.07738  0.00484  0.07752  0.00445 
  33     103   0.08010  0.00408  0.07988  0.00373      77   0.07786  0.00474  0.07759  0.00447 
  34     105   0.07977  0.00367  0.08000  0.00372     117   0.07779  0.00459  0.07766  0.00450 
  35      91   0.08039  0.00358  0.08013  0.00372     108   0.07756  0.00452  0.07773  0.00452 
  36      99   0.07966  0.00397  0.08027  0.00371      98   0.07854  0.00425  0.07782  0.00454 
  37     121   0.07999  0.00381  0.08042  0.00371     112   0.07815  0.00396  0.07790  0.00457 
  38      84   0.08031  0.00367  0.08057  0.00371     103   0.07861  0.00500  0.07800  0.00459 
  39     119   0.08114  0.00363  0.08072  0.00370     100   0.07779  0.00480  0.07810  0.00462 
  40     123   0.08089  0.00354  0.08087  0.00370     120   0.07790  0.00462  0.07820  0.00464 
  41     117   0.08127  0.00335  0.08102  0.00370     127   0.07892  0.00403  0.07831  0.00466 
  42     129   0.08122  0.00347  0.08117  0.00369     116   0.07833  0.00463  0.07842  0.00469 
  43     120   0.08084  0.00339  0.08132  0.00369     109   0.07882  0.00493  0.07854  0.00471 
  44     123   0.08110  0.00327  0.08148  0.00368     119   0.07774  0.00498  0.07866  0.00473 
  45     115   0.08140  0.00332  0.08165  0.00368     124   0.07860  0.00462  0.07879  0.00476 
  46     120   0.08272  0.00426  0.08183  0.00368     108   0.07900  0.00386  0.07892  0.00478 
  47      97   0.08176  0.00306  0.08201  0.00367     113   0.07916  0.00477  0.07905  0.00480 
  48      80   0.08119  0.00323  0.08221  0.00367     111   0.07888  0.00542  0.07919  0.00483 
  49     104   0.08272  0.00400  0.08240  0.00367      91   0.07978  0.00464  0.07933  0.00485 
  50     101   0.08322  0.00333  0.08260  0.00366      90   0.07894  0.00506  0.07947  0.00487 
  51     111   0.08261  0.00385  0.08279  0.00366     108   0.08039  0.00436  0.07962  0.00489 
  52      84   0.08281  0.00360  0.08297  0.00365     126   0.08068  0.00471  0.07977  0.00492 
  53     105   0.08272  0.00399  0.08315  0.00365      90   0.07941  0.00420  0.07992  0.00494 
  54     101   0.08324  0.00356  0.08334  0.00365      99   0.08054  0.00541  0.08007  0.00496 
  55      74   0.08388  0.00406  0.08352  0.00364      76   0.07872  0.00498  0.08023  0.00498 
  56      74   0.08321  0.00386  0.08369  0.00364      83   0.08000  0.00566  0.08039  0.00501 
  57      74   0.08529  0.00393  0.08386  0.00364      74   0.08025  0.00504  0.08055  0.00503 
  58      62   0.08374  0.00344  0.08403  0.00363      57   0.08204  0.00491  0.08072  0.00505 
  59      68   0.08343  0.00354  0.08419  0.00363      58   0.08038  0.00481  0.08088  0.00507 
  60     136   0.08392  0.00354  0.08436  0.00362     139   0.08094  0.00514  0.08105  0.00509 
  61     113   0.08487  0.00354  0.08454  0.00362     117   0.08183  0.00478  0.08122  0.00511 
  62     104   0.08455  0.00348  0.08471  0.00362     113   0.08146  0.00448  0.08139  0.00514 
  63      87   0.08513  0.00352  0.08489  0.00361     115   0.08226  0.00471  0.08156  0.00516 
  64      94   0.08489  0.00275  0.08506  0.00361     112   0.08120  0.00556  0.08174  0.00518 
  65     107   0.08547  0.00343  0.08522  0.00360     109   0.08148  0.00604  0.08191  0.00520 
  66     115   0.08583  0.00343  0.08537  0.00360      88   0.08148  0.00566  0.08208  0.00522 
  67      76   0.08518  0.00324  0.08551  0.00360      97   0.08283  0.00486  0.08226  0.00524 
  68     100   0.08565  0.00298  0.08565  0.00359      96   0.08228  0.00544  0.08243  0.00526 
  69      79   0.08633  0.00382  0.08578  0.00359      81   0.08209  0.00528  0.08261  0.00528 
  70     119   0.08534  0.00387  0.08591  0.00359      90   0.08316  0.00485  0.08278  0.00530 
  71      89   0.08603  0.00356  0.08604  0.00358      83   0.08394  0.00501  0.08296  0.00533 
  72      94   0.08635  0.00364  0.08616  0.00358      79   0.08246  0.00563  0.08313  0.00535 
  73      89   0.08605  0.00325  0.08629  0.00357      82   0.08495  0.00495  0.08330  0.00537 
  74      71   0.08648  0.00387  0.08641  0.00357      67   0.08342  0.00443  0.08346  0.00539 
  75      86   0.08713  0.00363  0.08653  0.00357      72   0.08276  0.00449  0.08363  0.00541 
  76      65   0.08671  0.00313  0.08665  0.00356      65   0.08464  0.00501  0.08380  0.00543 
  77      51   0.08691  0.00348  0.08675  0.00356      67   0.08539  0.00500  0.08396  0.00545 
  78      74   0.08592  0.00383  0.08685  0.00355      41   0.08332  0.00611  0.08412  0.00547 
  79      44   0.08745  0.00361  0.08695  0.00355      49   0.08376  0.00585  0.08428  0.00549 
  80      72   0.08759  0.00384  0.08705  0.00355      71   0.08543  0.00598  0.08444  0.00551 
  81      75   0.08714  0.00395  0.08714  0.00354      82   0.08406  0.00567  0.08460  0.00553 
  82      55   0.08713  0.00370  0.08723  0.00354      55   0.08355  0.00641  0.08476  0.00555 
  83      37   0.08714  0.00342  0.08732  0.00354      53   0.08542  0.00611  0.08492  0.00557 
  84      44   0.08763  0.00385  0.08742  0.00353      62   0.08407  0.00484  0.08508  0.00559 
  85     153   0.08811  0.00356  0.08811  0.00356     196   0.08533  0.00528  0.08533  0.00528 
 
`;

const columns = [
   "age", "numberOfMales", "MeanABSIMale", "SDABSIMale", "SmoothMeanABSIMale", "SmoothSDABSIMale",
   "numberOfFemales", "MeanABSIFemale", "SDABSIFemale", "SmoothMeanABSIFemale", "SmoothSDABSIFemale"
]

const rows = inputText.trim().split("\n").filter(Boolean)
const cols = rows.map(row => row.split(" ").map(i => i.trim()).filter(Boolean)
   .reduce((acc, curr, index) => ({ ...acc, [columns[index]]: curr }), {}))
console.log(cols)