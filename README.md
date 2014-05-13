[root@localhost Mobile]# keytool -genkey -v -keystore partiuai.keystore -alias partiuai -keyalg RSA -keysize 2048 -validity 10000
Enter keystore password:  [partiuai]
Re-enter new password: [partiuai]
What is your first and last name?
  [Unknown]:  Luis Mendes
What is the name of your organizational unit?
  [Unknown]:  PartiuAi
What is the name of your organization?
  [Unknown]:  PartiuAi
What is the name of your City or Locality?
  [Unknown]:  Campinas
What is the name of your State or Province?
  [Unknown]:  São Paulo
What is the two-letter country code for this unit?
  [Unknown]:  BR
Is CN=Luis Mendes, OU=PartiuAi, O=PartiuAi, L=Campinas, ST=São Paulo, C=BR correct?
  [no]:  yes

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
    for: CN=Luis Mendes, OU=PartiuAi, O=PartiuAi, L=Campinas, ST=São Paulo, C=BR
Enter key password for <partiuai>
    (RETURN if same as keystore password):  
[Storing partiuai.keystore]



[root@localhost Mobile]# keytool -exportcert -alias partiuai -keystore partiuai.keystore | openssl sha1 -binary | openssl base64
Enter keystore password:  partiuai
P9s9Kbqw2wLq+1rr33LEwfSOCj4=

