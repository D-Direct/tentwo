#!/usr/bin/env python3
import json
import re

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON-LD
pattern = r'(<script type="application/ld\+json">)(.*?)(</script>)'
match = re.search(pattern, content, re.DOTALL)

if match:
    jsonld_str = match.group(2).strip()
    jsonld = json.loads(jsonld_str)

    # Update LodgingBusiness
    for item in jsonld['@graph']:
        if item['@type'] == 'LodgingBusiness':
            item['name'] = 'TENTWO Private Residence'
            item['alternateName'] = 'TEN TWO'
            item['description'] = 'TENTWO Private Residence is a luxury private villa near Kandy, Sri Lanka, reserved exclusively for one family or group at a time. The residence features 3 en-suite bedrooms, a private pool, rooftop terrace, and contemporary architecture surrounded by natural landscape.'
            item['priceRange'] = 'USD 150–190'
            item['occupancy'] = {'@type': 'QuantitativeValue', 'maxValue': 6}
            item['checkinTime'] = '14:00'
            item['checkoutTime'] = '11:00'
            item['sameAs'] = [
                'https://www.instagram.com/tentwo.residence/',
                'https://www.youtube.com/channel/UCQ48IKbJ31rcb92CKcjK4Mw',
                'https://airbnb.com/h/tentwo',
                'https://www.booking.com/hotel/lk/luxury-villa-in-kandy-with-a-private-pool.html',
                'https://www.agoda.com/luxury-villa-in-kandy-with-a-private-pool/hotel/kandy-lk.html',
                'https://maps.google.com/?cid=8417117858617146359'
            ]
            if 'maximumAttendeeCapacity' in item:
                del item['maximumAttendeeCapacity']
        elif item['@type'] == 'WebSite':
            item['name'] = 'TENTWO Private Residence'

    # Pretty print JSON
    new_jsonld_str = json.dumps(jsonld, indent=6, ensure_ascii=False)

    # Replace in content
    new_content = content.replace(match.group(0), f'{match.group(1)}\n      {new_jsonld_str}\n    {match.group(3)}')

    # Write back
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print('Updated JSON-LD in index.html')
else:
    print('Could not find JSON-LD in index.html')
